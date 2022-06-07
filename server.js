const express = require("express");
const path = require("path");
const rateLimit = require("express-rate-limit");
const app = express();

const limiter =  rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
})

app.use(express.static(__dirname + "/dist/fuck-marry-kill-anime"), limiter);
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname + "/dist/fuck-marry-kill-anime/index.html"));
});
app.listen(process.env.PORT || 8080);
