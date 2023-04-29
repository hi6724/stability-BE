import express from 'express';

import { generateImgByText } from '../controller/genImgAPI';

const router = express.Router();

router.get('/', (req, res) => res.end('HELLO WORLD'));
router.post('/gen', generateImgByText);

export default router;
