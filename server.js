import * as dotenv from "dotenv";
dotenv.config();

import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI,
});

import express from "express";
const app = express();

import cors from "cors";
app.use(cors());
app.use(express.json());

app.post("/dream", async (req, res) => {
  const prompt = req.body.prompt;
  const aiResponse = await openai.images.generate({
    model: "dall-e-3",
    prompt,
    n:1,
    size: "1024x1024",
  });
  const image = aiResponse.data;
  console.log(image);
  res.send({ image });
});

app.listen(8080, () => console.log("make art on http://localhost:8080/dream"));
