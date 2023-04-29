//express 모듈 불러오기
import 'regenerator-runtime';
import express from 'express';
import cors from 'cors';
import router from './router/router.js';

const PORT = process.env.PORT || 8809;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', router);

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
