# Expense-Tracker-App
This Expense Tracker App helps you manage your finances by tracking your income and expenses. It provides a dashboard to view your current balance, recent transactions, and expense summaries.

## Table of Contents

- [Demo](#demo)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Dependencies](#dependencies)
- [Contributing](#contributing)
- [License](#license)

## Demo

Check out the live demo of the application on Vercel: [Expense Tracker App](https://expense-tracker-app-ruby.vercel.app/)

## Features

- Add, edit, and delete expenses.
- Track income and wallet balance.
- View recent transactions.
- Visualize expenses using charts.
- Pagination for transactions.
- Responsive design.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/TST14/Expense-Tracker-App.git
   ```
   
2. Navigate to the project directory:

    ```sh
    git clone https://github.com/TST14/Expense-Tracker-App.git
    ```

3. Install the dependencies:

    ```sh
    npm install
    ```

    or

    ```sh
    yarn install
    ```

### Running the App

To start the development server, run:

```sh
npm start
```
or
```sh
yarn start
```

This will start the app on `http://localhost:3000`.

### Usage

* Open the application in your browser.
* Use the dashboard to view your wallet balance, expenses, and recent transactions.
* Click on the "+ Add Income" or "+ Add Expense" buttons to add new transactions.
* Edit or delete transactions from the recent transactions list.
* Use the pagination buttons to navigate through the transactions.

### Dependencies

* React
* Recharts
* Notistack
* React Modal
* React Icons

Ensure you have these dependencies installed by running:

```bash
npm install recharts notistack react-modal react-icons
```

### File Structure

```
expense-tracker/
├── public/
├── src/
│   ├── components/
│   │   ├── balance-card/
│   │   ├── button/
│   │   ├── card/
│   │   ├── chart/
│   │   ├── modals/
│   │   ├── progress/
│   │   ├── title/
│   │   └── transaction/
│   ├── contexts/
│   ├── pages/
│   │   └── dashboard/
│   ├── services/
│   └── App.js
├── package.json
└── README.md
```
