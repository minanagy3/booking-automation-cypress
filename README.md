# Booking.com Automation Tests - Cypress JavaScript

This project contains automated tests for Booking.com using Cypress, JavaScript, and Page Object Model (POM) design pattern.

## 📋 Requirements

- Node.js (v16 or higher)
- npm or yarn

## 🚀 Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Create Excel test data file:**
   ```bash
   node scripts/create-excel-data.js
   ```

3. **Open Cypress Test Runner:**
   ```bash
   npm run test:open
   ```

## 📁 Project Structure

```
booking-automation-cypress/
├── cypress/
│   ├── e2e/              # Test files
│   │   └── booking-flow.cy.js
│   ├── pages/            # Page Object Model classes
│   │   ├── HomePage.js
│   │   ├── SearchResultsPage.js
│   │   ├── HotelDetailsPage.js
│   │   └── ReservationPage.js
│   ├── utils/            # Utility classes
│   │   ├── ExcelDataProvider.js
│   │   └── DateHelper.js
│   ├── support/          # Support files
│   │   ├── commands.js
│   │   └── e2e.js
│   └── fixtures/         # Test fixtures
├── data/                 # Test data files
│   └── test-data.xlsx
├── scripts/               # Helper scripts
│   └── create-excel-data.js
├── cypress.config.js
├── package.json
└── README.md
```

## 🧪 Test Cases

The project includes the following test cases:

1. **Complete booking flow** - End-to-end test covering:
   - Opening booking.com
   - Searching for Alexandria location
   - Selecting check-in (1 week from today) and check-out (4 days after check-in) dates
   - Finding and selecting Tolip Hotel Alexandria
   - Selecting bed and amount
   - Clicking "I'll reserve" button

2. **Verify check-in and check-out dates in details page** - Asserts that the chosen dates are displayed correctly on the hotel details page.

3. **Verify hotel name in reservation page** - Asserts that "Tolip Hotel Alexandria" is shown in the reservation page.

## 📊 Test Data

Test data is stored in `data/test-data.xlsx` with the following columns:
- **Location**: Search location (e.g., "Alexandria")
- **CheckInDate**: Check-in date (format: DD/MM/YYYY)
- **CheckOutDate**: Check-out date (format: DD/MM/YYYY)

If dates are not provided in Excel, the system will automatically calculate:
- Check-in: 1 week from today
- Check-out: 4 days after check-in

## 🏃 Running Tests

### Run tests in headless mode:
```bash
npm test
```

### Run tests in headed mode (see browser):
```bash
npm run test:headed
```

### Open Cypress Test Runner (Interactive):
```bash
npm run test:open
```

### Run tests in specific browser:
```bash
npm run test:chrome
npm run test:firefox
npm run test:edge
```

## 🎯 Features

- ✅ Page Object Model (POM) design pattern
- ✅ Excel data provider for test data
- ✅ Cypress for reliable browser automation
- ✅ Automatic date calculation
- ✅ Comprehensive test coverage
- ✅ Custom Cypress commands
- ✅ Screenshots and videos on failure

## 📝 Notes

- The tests handle dynamic content and may need selector adjustments based on Booking.com's UI changes
- Cookies popup is automatically handled via custom command
- Tests include proper waits and error handling
- Screenshots and videos are captured on test failures

## 🔧 Configuration

Edit `cypress.config.js` to modify:
- Base URL
- Viewport size
- Timeouts
- Browser settings
- Video/screenshot settings

## 📦 Dependencies

- **Cypress** 13.6.0
- **ExcelJS** 4.4.0 (for Excel data provider)

## 📄 License

ISC

## 👤 Author

Junior QA Engineer

