export const getResponses = async () => {
  try {
    const res = await fetch(`https://caregiving-ally.onrender.com/api/responses`);

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
    const res = await fetch(`api/response`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: response,
    });

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
