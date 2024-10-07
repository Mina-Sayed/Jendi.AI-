import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const SAHHA_API_URL = 'https://sandbox-api.sahha.ai';
const SAHHA_ACCOUNT_TOKEN = process.env.SAHHA_ACCOUNT_TOKEN;

const getAuthorizationHeader = () => {
  if (!SAHHA_ACCOUNT_TOKEN) {
    throw new Error('Account token is not defined in environment variables.');
  }
  return { Authorization: `Bearer ${SAHHA_ACCOUNT_TOKEN}` };
};

export const getProfileBiomarkers = async (
  externalId: string,
  categories: string[],
  types: string[],
  startDateTime: string,
  endDateTime: string
): Promise<any> => {
  if (!externalId) {
    throw new Error('External ID is required.');
  }

  if (categories.length === 0 && types.length === 0) {
    throw new Error('You must provide at least one category or type.');
  }

  try {
    const response = await axios.get(`${SAHHA_API_URL}/api/v1/profile/biomarker/${externalId}`, {
      headers: getAuthorizationHeader(),
      params: {
        categories: categories.join(','), 
        types: types.join(','), 
        startDateTime,
        endDateTime,
      },
    });

    return response.data;
  } catch (error: any) {
    const errorMessage = error.response?.data || error.message;
    console.error('Error fetching profile biomarkers:', errorMessage);
    throw new Error('Failed to fetch profile biomarkers');
  }
};

export const getProfileScores = async (
  externalId: string,
  types: string[],
  startDateTime: string,
  endDateTime: string,
  version: number = 1
): Promise<any> => {
  if (!externalId) {
    throw new Error('External ID is required.');
  }

  if (types.length === 0) {
    throw new Error('You must provide at least one type.');
  }

  try {
    const response = await axios.get(`${SAHHA_API_URL}/api/v1/profile/score/${externalId}`, {
      headers: getAuthorizationHeader(),
      params: {
        types: types.join(','),
        startDateTime,
        endDateTime,
        version,
      },
    });

    return response.data;
  } catch (error: any) {
    const errorMessage = error.response?.data || error.message;
    console.error('Error fetching profile scores:', errorMessage);
    throw new Error('Failed to fetch profile scores');
  }
};