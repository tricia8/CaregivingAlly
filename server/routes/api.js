import { Router } from "express";
import db from "../index.js";
import { startOfWeekUTC } from "../utils/startOfWeek.js";
import { getStoredPromptData, savePrompt } from "../utils/promptStorage.js";

const router = Router();

// Gemini

const prompt = `Generate one thoughtful and supportive prompt that caregivers can answer or reflect on. 
    The prompt should either encourage sharing personal experiences, advice, challenges, or achievements related to caregiving. 
    Examples include:
    What is one piece of advice you would give to fellow caregivers?
    What is one thing you are proudest of as a caregiver?
    Share a daily struggle you face in caregiving.
    What is one misconception about caregiving you wish people understood?
    What support do you wish was more available for caregivers like you?
    What motivates you to keep going as a caregiver on difficult days?
    How do you balance your personal needs with caregiving responsibilities?
    Share a story about a meaningful connection with the person you care for.
    Do not ask follow-up questions.`;

let history = [{ role: "user", parts: [{ text: prompt }] }];

// generate prompt
router.post("/generate", async (req, res) => {
  try {
    const now = new Date();
    const startOfWeek = await startOfWeekUTC(now);
    const { storedPrompt, lastGenerated } = await getStoredPromptData();

    if (
      !storedPrompt ||
      !lastGenerated ||
      new Date(lastGenerated) < startOfWeek
    ) {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: history,
            generationConfig: {
              temperature: 0.7,
              topK: 40,
              topP: 0.95,
              maxOutputTokens: 50,
            },
          }),
        }
      );

      const data = await response.json();
      console.log("Gemini raw response:", JSON.stringify(data, null, 2));

      const output =
        data?.candidates?.[0]?.content.parts?.[0]?.text ??
        "Share some challenges and rewards of caregiving!";

      await savePrompt(output);

      res.json({ output });
    } else {
      res.json({ output: storedPrompt });
    }
  } catch (error) {
    console.error("Gemini API error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// check query
router.post("/check", async (req, res) => {
  try {
    const { q } = req.query;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [
                {
                  text: `Rate from 0 to 100 how related this query is to caregiving, where 0 means completely unrelated and 100 means directly caregiving-related. Just output the number. Query: "${query}"`,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0,
            topK: 1,
            topP: 1,
            maxOutputTokens: 10,
          },
        }),
      }
    );

    const data = await response.json();
    console.log("Gemini raw response:", JSON.stringify(data, null, 2));

    const output = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? "0";

    const relevanceScore = parseInt(output);

    res.json({ relevanceScore });
  } catch (error) {
    console.error("Gemini API error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// Firestore

// get reponses
router.get("/responses", async (req, res) => {
  try {
    const voicesRef = db.collection(`responses`);
    const snapshot = await voicesRef.get();

    const responses = snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        text: data.response,
      };
    });

    return res.status(200).json({ responses });
  } catch (error) {
    console.error("Error fetching responses:", error);
    return res.status(500).json({ error: "Failed to fetch responses" });
  }
});

// post a response
router.post("/response", async (req, res) => {
  const { post } = req.body;

  if (!post) {
    return res.status(400).json({ error: "Post is required" });
  }

  try {
    const requestRef = await db.collection("responses").add({
      response: post,
    });

    return res.status(201).json({ requestId: requestRef.id });
  } catch (error) {
    console.error("Error creating post:", error);
    return res.status(500).json({ error: "Failed to create post" });
  }
});

// Youtube

// get videos
router.get("/search", async (req, res) => {
  const { q } = req.query;
  const maxResults = 6;

  const params = new URLSearchParams({
    key: process.env.YOUTUBE_API_KEY,
    part: "snippet",
    q,
    maxResults: maxResults.toString(),
    type: "video",
    safeSearch: "strict",
  });

  const url = `https://www.googleapis.com/youtube/v3/search?${params}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    const videos = data.items.map((item) => ({
      title: item.snippet.title,
      videoId: item.id.videoId,
      thumbnail: item.snippet.thumbnails.medium.url,
    }));

    res.json({ videos });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch YouTube videos" });
  }
});

export default router;
