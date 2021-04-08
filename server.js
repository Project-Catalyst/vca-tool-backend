const express = require("express");
const redis = require("redis");
const app = express();
const port = process.env.PORT || 3000;
const client = redis.createClient(process.env.REDIS_URL);

app.get("/", (req, res) => {
  res.send("vCA Backend");
});

app.get("/:id", (req, res) => {
  return client.get(req.params.id, (err, rep) => {
    if (err) return res.status(500).send("unavailable");
    return res.json({ reviews: parseInt(rep) });
  });
});

app.post("/:id", (req, res) => {
  return client.incr(req.params.id, function (err, count) {
    if (err) return res.status(500).send("unavailable");
    return res.json({ reviews: parseInt(count) });
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
