import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import Groq from "groq-sdk";

const app = express();
app.use(cors());
app.use(express.json());

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

app.post("/api/message", async (req, res) => {
  try {
    const { message } = req.body;

    const completion = await groq.chat.completions.create({
      model: "openai/gpt-oss-120b",
      messages: [{ role: "user", content: message }],
    });

    res.json({
      response: completion.choices[0].message.content,
    });

  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});