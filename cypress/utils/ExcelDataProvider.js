const ExcelJS = require('exceljs')

class ExcelDataProvider {
  constructor(filePath) {
    this.filePath = filePath
    this.workbook = null
    this.worksheet = null
  }

  async loadWorkbook() {
    this.workbook = new ExcelJS.Workbook()
    await this.workbook.xlsx.readFile(this.filePath)
    this.worksheet = this.workbook.getWorksheet(1)
  }

  async getTestData(rowNumber) {
    if (!this.worksheet) {
      await this.loadWorkbook()
    }

    const row = this.worksheet.getRow(rowNumber)
    
    return {
      location: this.getCellValueAsString(row.getCell(1)),
      checkInDate: this.getCellValueAsString(row.getCell(2)),
      checkOutDate: this.getCellValueAsString(row.getCell(3))
    }
  }

  getCellValueAsString(cell) {
    if (!cell || cell.value === null || cell.value === undefined) {
      return ''
    }
    
    if (typeof cell.value === 'string') {
      return cell.value
    }
    
    if (typeof cell.value === 'number') {
      return String(cell.value)
    }
    
    if (cell.value instanceof Date) {
      return cell.value.toISOString()
    }
    
    return String(cell.value)
  }

  static calculateCheckInDate() {
    const date = new Date()
    date.setDate(date.getDate() + 7) // One week from today
    return date
  }

  static calculateCheckOutDate(checkInDate) {
    const date = new Date(checkInDate)
    date.setDate(date.getDate() + 4) // 4 days after check-in
    return date
  }

  static parseDate(dateString) {
    if (!dateString || dateString === '') {
      return null
    }
    
    // Handle different date formats
    if (dateString.includes('/')) {
      const parts = dateString.split('/')
      const day = parseInt(parts[0])
      const month = parseInt(parts[1]) - 1 // JavaScript months are 0-indexed
      const year = parseInt(parts[2])
      return new Date(year, month, day)
    }
    
    return new Date(dateString)
  }
}

module.exports = ExcelDataProvider

