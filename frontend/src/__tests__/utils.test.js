import { describe, it, expect } from 'vitest'

// Test utility functions that might be in your app
function formatDate(date) {
  return new Date(date).toLocaleDateString()
}

function calculateAttendancePercentage(present, total) {
  if (total === 0) return 0
  return Math.round((present / total) * 100)
}

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

function generateStudentId(rollNo, division) {
  return `STU${division}${rollNo.padStart(3, '0')}`
}

describe('Utility Functions', () => {
  it('should format date correctly', () => {
    const date = '2024-01-15'
    const formatted = formatDate(date)
    expect(formatted).toBeDefined()
    expect(typeof formatted).toBe('string')
  })

  it('should calculate attendance percentage', () => {
    expect(calculateAttendancePercentage(8, 10)).toBe(80)
    expect(calculateAttendancePercentage(5, 5)).toBe(100)
    expect(calculateAttendancePercentage(0, 10)).toBe(0)
    expect(calculateAttendancePercentage(0, 0)).toBe(0)
  })

  it('should validate email addresses', () => {
    expect(validateEmail('teacher@cse.pune')).toBe(true)
    expect(validateEmail('student@example.com')).toBe(true)
    expect(validateEmail('invalid-email')).toBe(false)
    expect(validateEmail('')).toBe(false)
  })

  it('should generate student ID', () => {
    expect(generateStudentId('1', 'I')).toBe('STUI001')
    expect(generateStudentId('25', 'II')).toBe('STUII025')
    expect(generateStudentId('100', 'I')).toBe('STUI100')
  })
})
