const API_URL = "http://localhost:5000/api/joke"; 

export const fetchJoke = async () => {
  const res = await fetch(API_URL);
  return res.json();
};

export const submitVote = async (id, emoji) => {
  const API_URL = "http://localhost:5000/api/joke";  //  Check if this is the correct URL

  console.log(" Sending vote to backend:", id, emoji);

  try {
    const res = await fetch(`${API_URL}/${id}/vote`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ label: emoji }),  //  Backend expects `label`
    });

    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    const data = await res.json();
    console.log(" Vote successfully saved:", data);
    return data;
  } catch (error) {
    console.error(" Error in communication with backend:", error);
    return null;
  }
};
