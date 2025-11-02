const backendURL = "https://yt-download-backend-snl1.onrender.com/download";

const input = document.getElementById("urlInput");
const button = document.getElementById("downloadBtn");

button.addEventListener("click", async () => {
  const url = input.value.trim();
  if (!url) {
    alert("Enter a YouTube URL first!");
    return;
  }

  try {
    const response = await fetch(backendURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }),
    });

    if (!response.ok) {
      throw new Error("Failed to reach backend: " + response.status);
    }

    const data = await response.json();

    if (data.error) {
      alert("Error: " + data.error);
    } else {
      alert(`✅ Title: ${data.title}\n\nDirect URL: ${data.url}`);
    }
  } catch (error) {
    console.error(error);
    alert("❌ Something went wrong. Check console for details.");
  }
});
