# Expense Tracker App

The Expense Tracker App is a full-stack web application that helps users manage their expenses and incomes. It allows users to record financial transactions, categorize them, and view summaries on an interactive dashboard. This project uses a React-based frontend and a Node.js/Express backend, with MongoDB as the database.

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Setup and Installation](#setup-and-installation)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Future Enhancements](#future-enhancements)

## Features
- User Authentication (Login, Register)
- CRUD Operations for Transactions (Create, Read, Update, Delete)
- Categorized expense and income tracking
- Interactive dashboard with visualizations for income and expenses by category
- Responsive and user-friendly design

## Technologies Used

### Frontend
- **React**: For building the user interface and creating reusable components.
- **CSS**: For styling components and pages.
- **Chart.js**: To create visualizations on the dashboard for data insights.
- **React Router**: To handle routing for different views (Home, Auth, etc.).

### Backend
- **Node.js**: For the runtime environment to run JavaScript on the server.
- **Express**: As the web application framework to handle HTTP requests and APIs.
- **MongoDB**: A NoSQL database to store user data and transactions.
- **Mongoose**: For MongoDB object modeling and schema creation.
- **dotenv**: To manage environment variables securely.

## Project Structure

```plaintext
Expense-Tracker-App-main/
├── backend/
│   ├── .env                    # Environment variables
│   ├── app.js                  # Express server setup
│   ├── package.json            # Backend dependencies
│   ├── DB/
│   │   └── Database.js         # MongoDB connection setup
│   ├── Routers/
│   │   ├── Transactions.js     # Routes for transaction operations
│   │   └── userRouter.js       # Routes for user authentication
│   ├── controllers/
│   │   ├── transactionController.js # Transaction handling logic
│   │   └── userController.js    # User authentication logic
│   ├── models/
│   │   ├── TransactionModel.js  # Mongoose schema for transactions
│   │   └── UserSchema.js        # Mongoose schema for users
│
├── frontend/
│   ├── public/
│   │   ├── index.html           # Main HTML file
│   └── src/
│       ├── App.js               # Main React component
│       ├── Pages/
│       │   ├── Auth/
│       │   │   ├── Login.js     # Login page
│       │   │   └── Register.js  # Register page
│       │   ├── Avatar/
│       │   │   └── setAvatar.js # Avatar setup
│       │   └── Home/
│       │       ├── Home.js      # Home dashboard
│       ├── components/          # Reusable components (e.g., Transaction List)
│       ├── App.css              # Global styles
│       └── index.js             # React app entry point
```

## Setup and Installation

### Prerequisites
- **Node.js and npm**
- **MongoDB**

### Backend Setup

1. Navigate to the `backend` directory:
    ```bash
    cd Expense-Tracker-App-main/backend

2. Install backend dependencies:
    ```bash
    npm install
3. Create a .env file in the backend root and configure environment variables:
    ```bash
    MONGO_URI=<Your MongoDB URI>
    PORT=5000
    JWT_SECRET=<Your Secret Key>
4. Start the backend server:
    ```bash
    npm start

### Frontend Setup

1. Navigate to the frontend directory:
    ```bash
    cd ../frontend
2. Install frontend dependencies:
   ```bash
    npm install
3. Start the React development server:
    ```bash
    npm start
4. Access the app in your browser at http://localhost:3000.

## Usage

- **Login/Register:** Create an account or log in to start tracking your expenses.
- **Add Transactions:** Add details such as amount, category, and description for expenses and incomes.
- **View Dashboard:** Access the dashboard to view summaries and visual breakdowns of transactions.
- **Edit/Delete Transactions:** Modify or remove any transaction from the list.

## API Endpoints
The backend API provides several endpoints:

### User Authentication
- **POST /api/users/register:** Register a new user
- **POST /api/users/login:** Log in an existing user

### Transactions
- **GET /api/transactions:** Retrieve all transactions for the authenticated user
- **POST /api/transactions:** Add a new transaction
- **PUT /api/transactions/:id:** Update a specific transaction
- **DELETE /api/transactions/:id:** Delete a specific transaction

## Future Enhancements

- **Budgeting:** Set monthly or annual budgets and track against them.
- **Notifications:** Notify users of overspending.
- **Multi-Currency Support:** Allow tracking in different currencies.
- **Export Data:** Enable users to export their data as CSV or PDF.

## Contributing

Feel free to fork this project and submit pull requests. Contributions are welcome!