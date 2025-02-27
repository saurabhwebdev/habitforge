# HabitForge

A modern React application built with Vite, Firebase Authentication, and Ant Design.

## Features

- User Authentication (Login/Signup)
- Password Reset Functionality
- Protected Routes
- Modern UI with Ant Design
- Firebase Integration

## Tech Stack

- React
- Vite
- Firebase Authentication
- Ant Design (antd)
- React Router DOM

## Getting Started

1. Clone the repository
```bash
git clone https://github.com/saurabhwebdev/habitforge.git
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
cp .env.example .env
```
Then edit the `.env` file with your Firebase configuration values.

4. Start the development server
```bash
npm run dev
```

## Environment Setup

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Email/Password authentication in your Firebase project
3. Copy your Firebase configuration from Project Settings
4. Create a `.env` file based on `.env.example` and fill in your Firebase configuration values

The application uses the following environment variables:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

⚠️ **Important**: Never commit your `.env` file to version control. It contains sensitive information.
