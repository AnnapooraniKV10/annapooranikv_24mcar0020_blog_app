const express = require("express");
const client = require('prom-client');

const app = express();

app.use(express.json());

/* ---------------- PROMETHEUS SETUP ---------------- */

const register = new client.Registry();
client.collectDefaultMetrics({ register });

app.get("/metrics", async (req, res) => {
   res.set('Content-Type', register.contentType);
   res.end(await register.metrics());
});

/* ---------------- API ROUTES ---------------- */

let posts = [];

// API root check
app.get("/", (req,res)=>{
   res.send("API Running Successfully 🚀");
});

// Get posts
app.get("/posts",(req,res)=>{
   res.json(posts);
});

// Add post
app.post("/posts",(req,res)=>{
   posts.push(req.body);
   res.send("Post added");
});

/* ---------------- SERVER ---------------- */

app.listen(3000,()=>{
   console.log("Backend running");
});