import puppeteer from "puppeteer";

const browser = await puppeteer.launch({ headless: true });
const page = await browser.newPage();
await page.setViewport({ width: 1400, height: 900 });

const logs = [];
page.on("console", (msg) => logs.push(`[${msg.type()}] ${msg.text()}`));
page.on("pageerror", (err) => logs.push(`[PAGE ERROR] ${err.message}`));

await page.goto("http://localhost:8765/index.html", {
  waitUntil: "networkidle0",
});
await new Promise((r) => setTimeout(r, 500));

// Open the modal
await page.evaluate(() => {
  document.getElementById("openOptiCalc").click();
});
await new Promise((r) => setTimeout(r, 500));

// Check: should auto-estimate with default values
const info = await page.evaluate(() => {
  const c = document.getElementById("thCanvas");
  const ctx = c.getContext("2d");
  return {
    result: document.getElementById("thResult").textContent,
    note: document.getElementById("thSceneNote").textContent,
    power: document.getElementById("thPower").value,
    diameter: document.getElementById("thDiameter").value,
    facePixel: Array.from(
      ctx.getImageData(
        Math.floor(c.width * 0.55),
        Math.floor(c.height * 0.35),
        1,
        1,
      ).data,
    ),
    textPixel: Array.from(ctx.getImageData(20, 20, 1, 1).data),
  };
});

console.log("Auto-estimation result:", JSON.stringify(info, null, 2));
console.log(
  "Face profile drawn:",
  info.facePixel[3] > 0 &&
    (info.facePixel[0] !== info.textPixel[0] ||
      info.facePixel[1] !== info.textPixel[1]),
);

// Dark mode test
await page.evaluate(() => {
  const toggle =
    document.querySelector('[data-action="toggle-dark"]') ||
    document.getElementById("darkToggle");
  if (toggle) toggle.click();
});
await new Promise((r) => setTimeout(r, 300));

await page.screenshot({ path: "screenshot-auto-light.png" });

// Switch to dark mode
await page.evaluate(() => {
  const toggle =
    document.querySelector('[data-action="toggle-dark"]') ||
    document.getElementById("darkToggle");
  if (toggle) toggle.click();
});
await new Promise((r) => setTimeout(r, 300));

await page.screenshot({ path: "screenshot-auto-dark.png" });

if (logs.length > 0) {
  console.log("\nBrowser logs:");
  logs.forEach((l) => console.log(" ", l));
}

await browser.close();
