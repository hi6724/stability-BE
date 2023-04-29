import express from 'express';

import { generateImgByText } from '../controller/genImgAPI.js';
import { generateImgByImg } from '../controller/genImg2ImgAPI.js';

const router = express.Router();

router.get('/', (req, res) => res.end('HELLO WORLD'));
router.post('/gen', generateImgByText);
router.post('/image', generateImgByImg);

export default router;
