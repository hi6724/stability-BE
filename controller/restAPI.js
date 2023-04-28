import fs from "fs";
import * as Generation from "../generation/generation_pb";
import {
  buildGenerationRequest,
  executeGenerationRequest,
  onGenerationComplete,
} from "../helpers";
import { client, metadata } from "../client";
import axios from "axios";

export const restAPI = async (req, res) => {
  const { prompt } = req.params;
  console.log(prompt);

  const { data } = await axios.post(
    "https://api.stability.ai/v1/generation/stable-diffusion-v1-5/text-to-image",
    {
      text_prompts: [
        {
          text: `${prompt}`,
        },
      ],
      cfg_scale: 7,
      clip_guidance_preset: "FAST_BLUE",
      height: 512,
      width: 512,
      samples: 1,
      steps: 30,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization:
          "Bearer sk-AjQlvuov16EM0qpRX4W1KsDTpTXvnHzO6mHqd0n6Bgb7jGr8",
      },
    }
  );

  var img = await Buffer.from(data.artifacts[0].base64, "base64");
  res.writeHead(200, {
    "Content-Type": "image/png",
    "Content-Length": img.length,
  });

  res.end(img);
};
