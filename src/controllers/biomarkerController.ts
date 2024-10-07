import { Request, Response } from 'express';
import { getProfileBiomarkers, getProfileScores } from '../services/biomarkerService';

// Handler to fetch profile biomarkers
export const getProfileBiomarkersHandler = async (req: Request, res: Response): Promise<void> => {
  const { externalId } = req.params;
  const { categories, types, startDateTime, endDateTime } = req.query;

  try {
    const categoriesArray = Array.isArray(categories) ? categories.filter((category): category is string => Boolean(category)) : [categories].filter((category): category is string => Boolean(category));
    const typesArray = Array.isArray(types) ? types.filter((type): type is string => Boolean(type)) : [types].filter((type): type is string => Boolean(type));

    const biomarkers = await getProfileBiomarkers(
      externalId,
      categoriesArray,
      typesArray,
      startDateTime as string,
      endDateTime as string
    );
    res.status(200).json(biomarkers);
  } catch (error: any) {
    console.error('Error fetching profile biomarkers:', error);
    res.status(500).json({ message: 'Error fetching profile biomarkers', error: error.message });
  }
};

// Handler to fetch profile scores
export const getProfileScoresHandler = async (req: Request, res: Response): Promise<void> => {
  const { externalId } = req.params;
  const { types, startDateTime, endDateTime, version } = req.query;

  try {
    const typesArray = Array.isArray(types) ? types.filter((type): type is string => Boolean(type)) : [types].filter((type): type is string => Boolean(type));

    const scores = await getProfileScores(
      externalId,
      typesArray,
      startDateTime as string,
      endDateTime as string,
      version ? parseFloat(version as string) : 1
    );
    res.status(200).json(scores);
  } catch (error: any) {
    console.error('Error fetching profile scores:', error);
    res.status(500).json({ message: 'Error fetching profile scores', error: error.message });
  }
};