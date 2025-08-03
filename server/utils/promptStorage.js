import db from "../index.js";

export async function getStoredPromptData() {
  const docRef = db.collection("prompts").doc("current");
  const doc = await docRef.get();

  if (doc.exists) {
    const data = doc.data();
    return {
      storedPrompt: data.storedPrompt || null,
      lastGenerated: data.lastGenerated || null,
    };
  }

  return {
    storedPrompt: null,
    lastGenerated: null,
  };
}

export async function savePrompt(prompt) {
  const docRef = db.collection("prompts").doc("current");
  await docRef.set({
    storedPrompt: prompt,
    lastGenerated: new Date().toISOString(),
  });
}
