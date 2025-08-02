import { relevanceScore } from "./gemini";

export async function getSearchResults(query) {
  try {
    const relevance = await relevanceScore(query);

    let q = query;

    if (relevance < 40) {
      return "No caregiving-related content found. Please try a different search.";
    } else if (relevance < 70) {
      q = `${q} caregiving caregivers caregiver support`;
    }

    const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`);

    if (!res.ok) {
      const errMessage = await res.text();
      throw new Error(`Server error: ${res.status} ${errMessage}`);
    }

    const data = await res.json();

    return data.videos;
  } catch (error) {
    console.log("Error retrieving search results:", error);
    throw error;
  }
}
