const button = document.getElementById("downloadBtn");
const status = document.getElementById("status");

button.addEventListener("click", async () => {
  const url = document.getElementById("url").value.trim();

  if (!url) {
    status.textContent = "⚠️ Please enter a valid YouTube URL.";
    return;
  }

  button.disabled = true;
  status.textContent = "⏳ Downloading... Please wait.";

  try {
    // 🔹 Change this to your deployed backend URL when ready
    const backendURL = "https://yt-download-backend-snl1.onrender.com";

    const response = await fetch(backendURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Download failed");
    }

    const blob = await response.blob();
    const downloadUrl = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = downloadUrl;
    a.download = "video.mp4";
    a.click();
    window.URL.revokeObjectURL(downloadUrl);

    status.textContent = "✅ Download complete!";
  } catch (err) {
    status.textContent = "❌ Error: " + err.message;
  } finally {
    button.disabled = false;
  }
});
