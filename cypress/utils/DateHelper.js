class DateHelper {
  static formatDate(date) {
    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const year = date.getFullYear()
    return `${day}/${month}/${year}`
  }

  static formatDateForDisplay(date) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    return date.toLocaleDateString('en-US', options)
  }

  static containsDate(text, date) {
    const day = String(date.getDate())
    const month = String(date.getMonth() + 1)
    return text.includes(day) && text.includes(month)
  }

  static areDatesEqual(date1, date2) {
    return date1.getDate() === date2.getDate() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getFullYear() === date2.getFullYear()
  }
}

module.exports = DateHelper

