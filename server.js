const express = require("express");
const cors = require("cors");
const { promisify } = require("util");
const redis = require("redis");
const app = express();
const port = process.env.PORT || 3000;
const client = redis.createClient(process.env.REDIS_URL);
const getAsync = promisify(client.get).bind(client);
const keysAsync = promisify(client.keys).bind(client);

app.use(cors());

app.get("/", async (req, res) => {
  try {
    const keys = await keysAsync("*");
    return res.json(
      Object.assign(
        {},
        ...(await Promise.all(
          keys.map((key) => {
            return getAsync(key).then((value) => ({ [key]: parseInt(value) }));
          })
        ))
      )
    );
  } catch (err) {
    return res.status(500).send("unavailable");
  }
});

app.get("/:id", (req, res) => {
  return client.get(req.params.id, (err, rep) => {
    if (err) return res.status(500).send("unavailable");
    return res.json({ reviews: parseInt(rep) });
  });
});

app.post("/:id", (req, res) => {
  return client.incr(req.params.id, (err, count) => {
    if (err) return res.status(500).send("unavailable");
    return res.json({ reviews: parseInt(count) });
  });
});

app.delete("/:id", (req, res) => {
  return client.decr(req.params.id, (err, count) => {
    if (err) return res.status(500).send("unavailable");
    return res.json({ reviews: parseInt(count) });
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
