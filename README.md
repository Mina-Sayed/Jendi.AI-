

# Sahha Profile Biomarker and Score API

This project provides an API service to interact with the Sahha API for fetching profile biomarkers and scores using account authorization. The service allows users to retrieve biomarkers and scores for a given time window for a specific profile by providing the necessary parameters.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
  - [Fetch Profile Biomarkers](#fetch-profile-biomarkers)
  - [Fetch Profile Scores](#fetch-profile-scores)
- [Running the Application](#running-the-application)

## Features

- Fetch biomarkers for a profile with account authorization.
- Fetch scores for a profile within a given time window with account authorization.
- Provides easy-to-use API endpoints.
- Error handling and logging for API failures.

## Technologies Used

- Node.js
- Express.js
- TypeScript
- Axios
- Dotenv

## Project Structure

```plaintext
.
├── src
│   ├── controllers
│   │   └── biomarkerController.ts     # Controller handling the requests
│   ├── routes
│   │   └── biomarkerRoutes.ts         # Routes for the API
│   ├── services
│   │   └── biomarkerService.ts        # Service layer for Sahha API requests
│   └── index.ts                       # Entry point of the app
├── .env                               # Environment variables (ignored in Git)
├── package.json
├── tsconfig.json
└── README.md                          # Documentation
```

## Installation

To set up and run the application locally, follow the steps below:

### 1. Clone the Repository

```bash
git clone git@github.com:Mina-Sayed/Jendi.AI-.git
cd sahha-microservice
```

### 2. Install Dependencies

Make sure you have Node.js installed, then run:

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root directory with the following environment variables:

```plaintext
SAHHA_ACCOUNT_TOKEN=your_sahha_account_token
PORT=3000
```

You need to replace `your_sahha_account_token` with the actual token from Sahha. You can retrieve the token from the Sahha API.

## API Endpoints

The following endpoints are available in the API.

### Fetch Profile Biomarkers

Fetches biomarkers for a given time window for a profile using account authorization.

- **URL**: `/api/biomarkers/:externalId`
- **Method**: `GET`
- **Path Parameter**:
  - `externalId` (required): The ID of the profile to retrieve biomarkers for.
- **Query Parameters**:
  - `categories`: An array of biomarker categories (e.g., `activity`, `sleep`).
  - `types`: An array of biomarker types (e.g., `heart_rate`, `steps`).
  - `startDateTime` (required): Start of the time window (format: `YYYY-MM-DDTHH:mm:ssZ`).
  - `endDateTime` (required): End of the time window (format: `YYYY-MM-DDTHH:mm:ssZ`).

#### Example Request

```bash
curl -X GET "http://localhost:3000/api/biomarkers/12345?categories=activity&types=sleep,heart_rate&startDateTime=2024-10-01T00:00:00Z&endDateTime=2024-10-07T00:00:00Z"
```

#### Example Response

```json
{
  "data": [
    {
      "type": "sleep",
      "category": "activity",
      "score": 75,
      "dateTime": "2024-10-01T08:00:00Z"
    },
    {
      "type": "heart_rate",
      "category": "activity",
      "score": 60,
      "dateTime": "2024-10-01T09:00:00Z"
    }
  ]
}
```

### Fetch Profile Scores

Fetches scores for a given time window for a profile with account authorization.

- **URL**: `/api/scores/:externalId`
- **Method**: `GET`
- **Path Parameter**:
  - `externalId` (required): The ID of the profile to retrieve scores for.
- **Query Parameters**:
  - `types`: An array of score types (e.g., `activity`, `stress_resilience`).
  - `startDateTime` (required): Start of the time window (format: `YYYY-MM-DDTHH:mm:ssZ`).
  - `endDateTime` (required): End of the time window (format: `YYYY-MM-DDTHH:mm:ssZ`).
  - `version`: The version of the score to retrieve (default is `1`).

#### Example Request

```bash
curl -X GET "http://localhost:3000/api/scores/12345?types=activity,stress&startDateTime=2024-10-01T00:00:00Z&endDateTime=2024-10-07T00:00:00Z&version=1"
```

#### Example Response

```json
{
  "data": [
    {
      "type": "activity",
      "score": 85,
      "dateTime": "2024-10-01T08:00:00Z"
    },
    {
      "type": "stress",
      "score": 65,
      "dateTime": "2024-10-01T09:00:00Z"
    }
  ]
}
```

## Running the Application

To run the application:

1. Start the server:

   ```bash
   npm start
   ```

2. The server will be running on `http://localhost:3000` by default.

You can now use the API endpoints to fetch profile biomarkers and scores from the Sahha API using your token for authorization.

## Error Handling

If any errors occur during the API requests (e.g., invalid `externalId`, missing parameters, or API failures), the server will return a `500 Internal Server Error` with a message describing the issue.

### Example Error Response

```json
{
  "message": "Error fetching profile biomarkers",
  "error": "External ID is required."
}
```
