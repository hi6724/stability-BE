import * as Generation from "./generation/generation_pb.js";

const request = buildGenerationRequest("stable-diffusion-xl-beta-v2-2-2", {
  type: "text-to-image",
  prompts: [
    {
      text: "A dream of a distant galaxy, by Caspar David Friedrich, matte painting trending on artstation HQ",
    },
  ],
  width: 512,
  height: 512,
  samples: 1,
  cfgScale: 13,
  steps: 25,
  sampler: Generation.DiffusionSampler.SAMPLER_K_DPMPP_2M,
});

executeGenerationRequest(client, request, metadata)
  .then(onGenerationComplete)
  .catch((error) => {
    console.error("Failed to make text-to-image request:", error);
  });
