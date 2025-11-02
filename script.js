document.getElementById("downloadBtn").addEventListener("click", async () => {
  const urlInput = document.getElementById("urlInput");
  const status = document.getElementById("status");
  const videoUrl = urlInput.value.trim();

  if (!videoUrl) {
    status.textContent = "⚠️ Please enter a video URL.";
    return;
  }

  status.textContent = "⏳ Downloading... Please wait.";

  try {
    // ✅ Replace this with your actual Render backend URL
    const backendURL = "https://yt-download-backend-snl1.onrender.com/download";

    const response = await fetch(backendURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: videoUrl })
    });

    if (!response.ok) {
      throw new Error(`Server error: ${response.status}`);
    }

    // Convert response to a downloadable blob
    const blob = await response.blob();
    const downloadUrl = URL.createObjectURL(blob);

    // Auto-download file
    const a = document.createElement("a");
    a.href = downloadUrl;
    a.download = "video.mp4";
    document.body.appendChild(a);
    a.click();
    a.remove();

    // Cleanup
    URL.revokeObjectURL(downloadUrl);
    status.textContent = "✅ Download complete!";
  } catch (error) {
    console.error("Error:", error);
    status.textContent = "❌ Failed to download video. Try again.";
  }
});
