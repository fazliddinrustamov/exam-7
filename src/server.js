import express from 'express';
import { PORT } from './config.js';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import { categories } from './routes/categories.router.js';
import { admin } from './routes/admin.router.js';
import { events } from './routes/events.router.js';

const app = express();

app.use(express.json());
app.use(cors());
app.use(fileUpload());
app.use(admin);
app.use(events);
app.use(categories);

app.listen(PORT, () => console.log('http://localhost:' + PORT));