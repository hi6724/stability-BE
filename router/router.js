import express from "express";

import { testAPI } from "../controller/test";
import { restAPI } from "../controller/restAPI";

const router = express.Router();

router.get("/generate", testAPI);
router.get("/", restAPI);

export default router;
