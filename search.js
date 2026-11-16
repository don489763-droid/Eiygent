let allData = [];

fetch("data.json")
  .then(r => r.json())
  .then(d => {
    allData = d;
    console.log("Loaded " + allData.length + " pages");
  });

function doSearch() {
  const word = document.getElementById("q").value.toLowerCase().trim();
  const box = document.getElementById("results");
  if (!word) {
    box.innerHTML = "<p>Type something to search.</p>";
    return;
  }

  const found = allData.filter(p => JSON.stringify(p).toLowerCase().includes(word));

  if (found.length === 0) {
    box.innerHTML = `<p>Nothing found for "<b>${word}</b>"</p>`;
    return;
  }

  box.innerHTML = `<p>Found <b>${found.length}</b> results for "<b>${word}</b>"</p>` + found.map(p => {
    
    // --- FULL PARAGRAPHS ---
    // If p.paragraphs is a list, join them all. If it's just one string, use it.
    let fullText = "";
    if (Array.isArray(p.paragraphs)) {
      fullText = p.paragraphs.map(para => `<p style="line-height:1.7; margin-bottom:12px;">${para}</p>`).join("");
    } else if (p.paragraph) {
      fullText = `<p style="line-height:1.7;">${p.paragraph}</p>`;
    } else if (p.content) {
      fullText = `<p style="line-height:1.7;">${p.content}</p>`;
    }

    let headlines = "";
    if (Array.isArray(p.headlines)) {
      headlines = p.headlines.map(h => `<h4 style="margin:12px 0 5px 0;">${h}</h4>`).join("");
    }

    return `
      <div style="border:1px solid #ccc; padding:20px; margin:15px 0; border-radius:12px; background:white;">
        <span style="font-size:12px; background:#eee; padding:4px 10px; border-radius:20px;">${p._source || ""}</span>
        <h3 style="margin:10px 0;"><a href="${p.url || "#"}" target="_blank" style="color:#6a0dad; text-decoration:none;">${p.title || "No title"}</a></h3>
        ${headlines}
        <div>${fullText}</div>
      </div>
    `;
  }).join("");
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("searchForm");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      doSearch();
    });
  }
});
