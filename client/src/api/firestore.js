export const getResponses = async () => {
  try {
    const res = await fetch(
      `http://localhost:3000/api/responses`
    );

    if (!res.ok) {
      throw new Error("Failed to fetch responses");
    }

    const data = await res.json();
    return data.responses;
  } catch (error) {
    console.error("Error fetching responses:", error);
    throw error;
  }
};

export const submitResponse = async (response) => {
  try {
    const res = await fetch(
      `http://localhost:3000/api/response`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ post: response }),
      }
    );

    if (!res.ok) {
      throw new Error("Failed to submit response");
    }

    const data = await res.json();
    return data.requestId;
  } catch (error) {
    console.error("Error submitting response:", error);
    throw error;
  }
};
