//express 모듈 불러오기
import "regenerator-runtime";
import express from "express";
import cors from "cors";

import router from "./router/router";

import * as Generation from "./generation/generation_pb";
import { GenerationServiceClient } from "./generation/generation_pb_service";
import { grpc as GRPCWeb } from "@improbable-eng/grpc-web";
import { NodeHttpTransport } from "@improbable-eng/grpc-web-node-http-transport";

GRPCWeb.setDefaultTransport(NodeHttpTransport());

const metadata = new GRPCWeb.Metadata();
metadata.set(
  "Authorization",
  "Bearer " + "sk-AjQlvuov16EM0qpRX4W1KsDTpTXvnHzO6mHqd0n6Bgb7jGr8"
);

// Create a generation client to use with all future requests
export const aiClient = new GenerationServiceClient(
  "https://grpc.stability.ai",
  {}
);

const PORT = process.env.PORT || 8809;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", router);

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
