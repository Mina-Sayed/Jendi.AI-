import { Request, Response } from 'express';
import { getProfileBiomarkers, getProfileScores } from '../services/biomarkerService';

// Enums for biomarker categories and types
enum BiomarkerCategory {
  Activity = 'activity',
  Sleep = 'sleep',
}

enum BiomarkerType {
  HeartRate = 'heart_rate',
  Steps = 'steps',
  Sleep = 'sleep',
}

// Type guard for BiomarkerCategory
function isBiomarkerCategory(value: any): value is BiomarkerCategory {
  return Object.values(BiomarkerCategory).includes(value);
}

// Type guard for BiomarkerType
function isBiomarkerType(value: any): value is BiomarkerType {
  return Object.values(BiomarkerType).includes(value);
}

// Handler to fetch profile biomarkers
export const getProfileBiomarkersHandler = async (req: Request, res: Response): Promise<void> => {
  const { externalId } = req.params;
  const { categories, types, startDateTime, endDateTime } = req.query;

  try {
    const categoriesArray = Array.isArray(categories) ? categories.filter((category): category is string => Boolean(category)) : [categories].filter((category): category is string => Boolean(category));
    const typesArray = Array.isArray(types) ? types.filter((type): type is string => Boolean(type)) : [types].filter((type): type is string => Boolean(type));

    // Use type guards to narrow down types
    const validCategories = categoriesArray.filter(isBiomarkerCategory);
    const validTypes = typesArray.filter(isBiomarkerType);

    const biomarkers = await getProfileBiomarkers(
      externalId,
      validCategories,
      validTypes,
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

    // Use type guards to narrow down types
    const validTypes = typesArray.filter(isBiomarkerType);

    const scores = await getProfileScores(
      externalId,
      validTypes,
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
