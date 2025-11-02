// ======== BACKEND URL ========
const backendURL = "https://yt-download-backend-snl1.onrender.com/download";

// ======== UI ELEMENTS ========
const input = document.getElementById("urlInput");
const button = document.getElementById("downloadBtn");

// ======== BUTTON EVENT ========
button.addEventListener("click", async () => {
  const url = input.value.trim();

  if (!url) {
    alert("⚠️ Please enter a YouTube video URL!");
    return;
  }

  try {
    // ======== SEND REQUEST TO BACKEND ========
    const response = await fetch(backendURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url }),
    });

    if (!response.ok) {
      throw new Error("Backend error: " + response.status);
    }

    const data = await response.json();

    if (data.error) {
      alert("❌ Error: " + data.error);
      return;
    }

    // ======== SUCCESS ========
    alert(`✅ Title: ${data.title}\n\nDirect link: ${data.direct_url}`);

    // Optional: open the video directly
    if (data.direct_url) {
      window.open(data.direct_url, "_blank");
    }

  } catch (error) {
    console.error("Fetch error:", error);
    alert("❌ Something went wrong. Check console for details.");
  }
});
