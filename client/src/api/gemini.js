export async function generatePrompt() {
  try {
    const res = await fetch("http://localhost:3000/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    });

    if (!res.ok) {
      const errMessage = await res.text();
      throw new Error(`Server error: ${res.status} ${errMessage}`);
    }

    const data = await res.json();

    return data.output;
  } catch (error) {
    console.log("Error generating prompt:", error);
    throw error;
  }
}

export async function relevanceScore(query) {
  try {
    const res = await fetch(`http://localhost:3000/api/search?q=${encodeURIComponent(query)}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      const errMessage = await res.text();
      throw new Error(`Server error: ${res.status} ${errMessage}`);
    }

    const data = await res.json();

    return data.relevanceScore;
  } catch (error) {
    console.log("Error checking query:", error);
    throw error;
  }
}
