import puppeteer from "puppeteer";
import fs from "fs";

const browser = await puppeteer.launch({ headless: true });
const page = await browser.newPage();
await page.setViewport({ width: 1400, height: 900 });

// Collect console messages and errors
const logs = [];
page.on("console", (msg) => logs.push(`[${msg.type()}] ${msg.text()}`));
page.on("pageerror", (err) => logs.push(`[PAGE ERROR] ${err.message}`));

await page.goto("http://localhost:8765/index.html", {
  waitUntil: "networkidle0",
});

// Wait a bit for scripts to run
await new Promise((r) => setTimeout(r, 1000));

// Check if thCanvas exists and has dimensions
const canvasInfo = await page.evaluate(() => {
  const c = document.getElementById("thCanvas");
  if (!c) return { error: "thCanvas not found" };
  const ctx = c.getContext("2d");
  return {
    exists: true,
    width: c.width,
    height: c.height,
    clientWidth: c.clientWidth,
    clientHeight: c.clientHeight,
    display: getComputedStyle(c).display,
    visibility: getComputedStyle(c).visibility,
    opacity: getComputedStyle(c).opacity,
    parentDisplay: c.parentElement
      ? getComputedStyle(c.parentElement).display
      : "N/A",
    hasContext: !!ctx,
    // Sample some pixels from the canvas
    topLeftPixel: ctx ? Array.from(ctx.getImageData(0, 0, 1, 1).data) : null,
    centerPixel: ctx
      ? Array.from(
          ctx.getImageData(
            Math.floor(c.width / 2),
            Math.floor(c.height / 2),
            1,
            1,
          ).data,
        )
      : null,
  };
});

console.log(
  "Canvas info (before modal open):",
  JSON.stringify(canvasInfo, null, 2),
);

// Now simulate opening the opticalc modal
await page.evaluate(() => {
  const btn = document.getElementById("openOptiCalc");
  if (btn) btn.click();
});
await new Promise((r) => setTimeout(r, 500));

const canvasInfoAfterOpen = await page.evaluate(() => {
  const c = document.getElementById("thCanvas");
  if (!c) return { error: "thCanvas not found" };
  const ctx = c.getContext("2d");
  return {
    width: c.width,
    height: c.height,
    clientWidth: c.clientWidth,
    clientHeight: c.clientHeight,
    display: getComputedStyle(c).display,
    visibility: getComputedStyle(c).visibility,
    parentDisplay: c.parentElement
      ? getComputedStyle(c.parentElement).display
      : "N/A",
    topLeftPixel: ctx ? Array.from(ctx.getImageData(0, 0, 1, 1).data) : null,
    centerPixel: ctx
      ? Array.from(
          ctx.getImageData(
            Math.floor(c.width / 2),
            Math.floor(c.height / 2),
            1,
            1,
          ).data,
        )
      : null,
    faceAreaPixel: ctx
      ? Array.from(
          ctx.getImageData(
            Math.floor(c.width * 0.55),
            Math.floor(c.height * 0.35),
            1,
            1,
          ).data,
        )
      : null,
  };
});

console.log(
  "Canvas info (after modal open):",
  JSON.stringify(canvasInfoAfterOpen, null, 2),
);

// Now fill in some values and trigger estimation
await page.evaluate(() => {
  const power = document.getElementById("thPower");
  const diameter = document.getElementById("thDiameter");
  if (power) {
    power.value = "-3.00";
    power.dispatchEvent(new Event("input"));
  }
  if (diameter) {
    diameter.value = "70";
    diameter.dispatchEvent(new Event("input"));
  }
});
await new Promise((r) => setTimeout(r, 300));

const canvasInfoAfterCalc = await page.evaluate(() => {
  const c = document.getElementById("thCanvas");
  if (!c) return { error: "thCanvas not found" };
  const ctx = c.getContext("2d");
  const result = document.getElementById("thResult");
  return {
    width: c.width,
    height: c.height,
    clientWidth: c.clientWidth,
    clientHeight: c.clientHeight,
    resultText: result ? result.textContent : "N/A",
    topLeftPixel: ctx ? Array.from(ctx.getImageData(0, 0, 1, 1).data) : null,
    centerPixel: ctx
      ? Array.from(
          ctx.getImageData(
            Math.floor(c.width / 2),
            Math.floor(c.height / 2),
            1,
            1,
          ).data,
        )
      : null,
    faceAreaPixel: ctx
      ? Array.from(
          ctx.getImageData(
            Math.floor(c.width * 0.55),
            Math.floor(c.height * 0.35),
            1,
            1,
          ).data,
        )
      : null,
    noteText: document.getElementById("thSceneNote")
      ? document.getElementById("thSceneNote").textContent
      : "N/A",
  };
});

console.log(
  "Canvas info (after estimate):",
  JSON.stringify(canvasInfoAfterCalc, null, 2),
);

// Take a screenshot of the modal
await page.screenshot({ path: "screenshot-opticalc.png", fullPage: false });

// Also capture just the canvas area
const canvasEl = await page.$("#thCanvas");
if (canvasEl) {
  await canvasEl.screenshot({ path: "screenshot-canvas-only.png" });
}

// Print console logs
if (logs.length > 0) {
  console.log("\nBrowser console messages:");
  logs.forEach((l) => console.log(" ", l));
}

await browser.close();
