import { Router } from 'express';
import { getProfileBiomarkersHandler, getProfileScoresHandler } from '../controllers/biomarkerController';

const router = Router();

// Route to fetch profile biomarkers
router.get('/biomarkers/:externalId', getProfileBiomarkersHandler);

// Route to fetch profile scores
router.get('/scores/:externalId', getProfileScoresHandler);

export default router;