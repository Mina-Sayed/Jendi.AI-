import express from 'express';
import dotenv from 'dotenv';
import biomarkerRoutes from './routes/biomarkerRoutes';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());


app.use('/api', biomarkerRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
