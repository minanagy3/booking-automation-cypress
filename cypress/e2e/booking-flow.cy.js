import HomePage from '../pages/HomePage'
import SearchResultsPage from '../pages/SearchResultsPage'
import HotelDetailsPage from '../pages/HotelDetailsPage'
import ReservationPage from '../pages/ReservationPage'
import ExcelDataProvider from '../utils/ExcelDataProvider'
import DateHelper from '../utils/DateHelper'

describe('Booking.com Automation Tests', () => {
  let homePage
  let searchResultsPage
  let hotelDetailsPage
  let reservationPage
  let testData
  let checkInDate
  let checkOutDate

  before(async () => {
    // Load test data from Excel
    const excelPath = Cypress.config('projectRoot') + '/data/test-data.xlsx'
    const dataProvider = new ExcelDataProvider(excelPath)
    
    testData = await dataProvider.getTestData(2)
    
    // Calculate dates if not provided in Excel
    if (testData.checkInDate && testData.checkInDate !== '') {
      checkInDate = ExcelDataProvider.parseDate(testData.checkInDate)
    } else {
      checkInDate = ExcelDataProvider.calculateCheckInDate()
    }

    if (testData.checkOutDate && testData.checkOutDate !== '') {
      checkOutDate = ExcelDataProvider.parseDate(testData.checkOutDate)
    } else {
      checkOutDate = ExcelDataProvider.calculateCheckOutDate(checkInDate)
    }

    // Initialize page objects
    homePage = new HomePage()
    searchResultsPage = new SearchResultsPage()
    hotelDetailsPage = new HotelDetailsPage()
    reservationPage = new ReservationPage()
  })

  it('Complete booking flow - Search, Select Hotel, and Reserve', () => {
    // Step 1: Navigate to booking.com
    homePage.navigate()

    // Step 2: Search for location, select dates, and click search
    const location = testData.location && testData.location !== '' 
      ? testData.location : 'Alexandria'
    homePage.searchHotel(location, checkInDate, checkOutDate)

    // Step 3: Wait for search results and find Tolip Hotel
    searchResultsPage.waitForResults()
    searchResultsPage.findAndClickTolipHotel()

    // Step 4: Select bed and amount, then click reserve
    hotelDetailsPage.waitForPageLoad()
    hotelDetailsPage.selectBedAndAmount()
    hotelDetailsPage.clickReserveButton()

    // Step 5: Wait for reservation page
    reservationPage.waitForPageLoad()
  })

  it('Verify check-in and check-out dates in details page', () => {
    // Navigate and search
    homePage.navigate()
    const location = testData.location && testData.location !== '' 
      ? testData.location : 'Alexandria'
    homePage.searchHotel(location, checkInDate, checkOutDate)

    // Find and click Tolip Hotel
    searchResultsPage.waitForResults()
    searchResultsPage.findAndClickTolipHotel()

    // Wait for details page
    hotelDetailsPage.waitForPageLoad()

    // Get displayed dates
    hotelDetailsPage.getCheckInDate().then((displayedCheckIn) => {
      hotelDetailsPage.getCheckOutDate().then((displayedCheckOut) => {
        // Assert dates are displayed correctly
        expect(displayedCheckIn).to.not.be.empty
        expect(displayedCheckOut).to.not.be.empty
        
        // Verify the dates contain the correct day/month/year
        expect(DateHelper.containsDate(displayedCheckIn, checkInDate)).to.be.true
        expect(DateHelper.containsDate(displayedCheckOut, checkOutDate)).to.be.true
      })
    })
  })

  it('Verify hotel name in reservation page', () => {
    // Navigate and search
    homePage.navigate()
    const location = testData.location && testData.location !== '' 
      ? testData.location : 'Alexandria'
    homePage.searchHotel(location, checkInDate, checkOutDate)

    // Find and click Tolip Hotel
    searchResultsPage.waitForResults()
    searchResultsPage.findAndClickTolipHotel()

    // Select bed and amount, then click reserve
    hotelDetailsPage.waitForPageLoad()
    hotelDetailsPage.selectBedAndAmount()
    hotelDetailsPage.clickReserveButton()

    // Wait for reservation page
    reservationPage.waitForPageLoad()

    // Verify hotel name
    reservationPage.verifyHotelName('Tolip Hotel Alexandria')
  })
})

