//app.js

(function setupPwaIconAndManifest(){
  function drawIcon(size){
    const canvas = document.createElement("canvas");
    canvas.width = size; canvas.height = size;
    const ctx = canvas.getContext("2d");

    const r = size * 0.22;
    ctx.fillStyle = "#4F7A6C";
    ctx.beginPath();
    ctx.moveTo(r, 0);
    ctx.lineTo(size - r, 0);
    ctx.quadraticCurveTo(size, 0, size, r);
    ctx.lineTo(size, size - r);
    ctx.quadraticCurveTo(size, size, size - r, size);
    ctx.lineTo(r, size);
    ctx.quadraticCurveTo(0, size, 0, size - r);
    ctx.lineTo(0, r);
    ctx.quadraticCurveTo(0, 0, r, 0);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = "rgba(255,255,255,0.06)";
    ctx.fillRect(0, 0, size, size * 0.5);

    const cx = size / 2, cy = size / 2, dotR = size * 0.28;
    ctx.fillStyle = "#FFFFFF";
    ctx.beginPath();
    ctx.arc(cx, cy, dotR, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = "#4F7A6C";
    ctx.lineWidth = size * 0.055;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.beginPath();
    ctx.moveTo(cx - dotR * 0.45, cy + dotR * 0.05);
    ctx.lineTo(cx - dotR * 0.1, cy + dotR * 0.4);
    ctx.lineTo(cx + dotR * 0.5, cy - dotR * 0.35);
    ctx.stroke();

    return canvas.toDataURL("image/png");
  }

  try{
    const icon180 = drawIcon(180);
    const iconLink = document.getElementById("appleTouchIconLink");
    iconLink.setAttribute("href", icon180);

    const icon192 = drawIcon(192);
    const icon512 = drawIcon(512);
    const manifest = {
      name: "자취 루틴",
      short_name: "자취루틴",
      start_url: ".",
      scope: ".",
      display: "standalone",
      orientation: "portrait",
      background_color: "#F1F3EE",
      theme_color: "#F1F3EE",
      icons: [
        { src: icon192, sizes: "192x192", type: "image/png" },
        { src: icon512, sizes: "512x512", type: "image/png" },
        { src: icon180, sizes: "180x180", type: "image/png", purpose: "any maskable" }
      ]
    };
    const manifestJson = JSON.stringify(manifest);
    let manifestHref = null;
    try{
      const blob = new Blob([manifestJson], { type: "application/manifest+json" });
      manifestHref = URL.createObjectURL(blob);
    }catch(e){
      manifestHref = "data:application/manifest+json," + encodeURIComponent(manifestJson);
    }
    document.getElementById("manifestLink").setAttribute("href", manifestHref);
  }catch(e){}
})();