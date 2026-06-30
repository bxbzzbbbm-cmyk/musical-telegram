const express = require("express");

const app = express();
const PORT = process.env.PORT || 5900;

// Possible RAM values (MB)
const RAM_VALUES = [512, 1024, 1536, 2048, 4096];

// Get random RAM
function getRandomRam() {
  const index = Math.floor(Math.random() * RAM_VALUES.length);
  return RAM_VALUES[index];
}

// Home route
app.get("/", (req, res) => {
  res.json({
    name: "RAM Checker API",
    endpoints: ["/api/ram", "/api/ram/random", "/api/test"]
  });
});

// Get RAM (random)
app.get("/api/ram", (req, res) => {
  res.json({
    success: true,
    ramMB: getRandomRam()
  });
});

// Another alias endpoint
app.get("/api/ram/random", (req, res) => {
  res.json({
    success: true,
    ramMB: getRandomRam()
  });
});

// Test endpoint with delay (sleep ms simulation)
app.get("/api/test", async (req, res) => {
  const start = Date.now();

  await new Promise((r) => setTimeout(r, 150));

  res.json({
    success: true,
    sleepMs: Date.now() - start,
    ramMB: getRandomRam()
  });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`RAM API running on port ${PORT}`);
});
