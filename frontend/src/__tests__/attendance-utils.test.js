import { describe, it, expect } from 'vitest'
import {
  calculateAttendancePercentage,
  validateEmail,
  formatStudentName,
  generateAttendanceReport,
  processStudentData,
  validateStudentData,
  generateStudentId,
  formatDate
} from '../utils/attendance.js'

describe('Attendance Utils - Real Coverage', () => {
  describe('calculateAttendancePercentage', () => {
    it('should calculate percentage correctly', () => {
      expect(calculateAttendancePercentage(8, 10)).toBe(80)
      expect(calculateAttendancePercentage(5, 5)).toBe(100)
      expect(calculateAttendancePercentage(0, 10)).toBe(0)
    })

    it('should handle zero total days', () => {
      expect(calculateAttendancePercentage(0, 0)).toBe(0)
      expect(calculateAttendancePercentage(5, 0)).toBe(0)
    })

    it('should round percentages correctly', () => {
      expect(calculateAttendancePercentage(1, 3)).toBe(33)
      expect(calculateAttendancePercentage(2, 3)).toBe(67)
    })
  })

  describe('validateEmail', () => {
    it('should validate correct emails', () => {
      expect(validateEmail('teacher@cse.pune')).toBe(true)
      expect(validateEmail('student@example.com')).toBe(true)
      expect(validateEmail('test.email+tag@domain.co.uk')).toBe(true)
    })

    it('should reject invalid emails', () => {
      expect(validateEmail('invalid-email')).toBe(false)
      expect(validateEmail('@domain.com')).toBe(false)
      expect(validateEmail('user@')).toBe(false)
      expect(validateEmail('')).toBe(false)
      expect(validateEmail(null)).toBe(false)
    })
  })

  describe('formatStudentName', () => {
    it('should format names correctly', () => {
      expect(formatStudentName('john doe')).toBe('JOHN DOE')
      expect(formatStudentName('  alice smith  ')).toBe('ALICE SMITH')
      expect(formatStudentName('BOB')).toBe('BOB')
    })
  })

  describe('generateAttendanceReport', () => {
    it('should generate report for good attendance', () => {
      const records = [
        { status: 'present' },
        { status: 'present' },
        { status: 'present' },
        { status: 'present' },
        { status: 'absent' }
      ]
      
      const report = generateAttendanceReport(records)
      
      expect(report.totalDays).toBe(5)
      expect(report.presentDays).toBe(4)
      expect(report.absentDays).toBe(1)
      expect(report.percentage).toBe(80)
      expect(report.status).toBe('Good')
    })

    it('should generate report for warning attendance', () => {
      const records = [
        { status: 'present' },
        { status: 'present' },
        { status: 'absent' },
        { status: 'absent' }
      ]
      
      const report = generateAttendanceReport(records)
      
      expect(report.percentage).toBe(50)
      expect(report.status).toBe('Warning')
    })

    it('should generate report for critical attendance', () => {
      const records = [
        { status: 'present' },
        { status: 'absent' },
        { status: 'absent' },
        { status: 'absent' }
      ]
      
      const report = generateAttendanceReport(records)
      
      expect(report.percentage).toBe(25)
      expect(report.status).toBe('Critical')
    })

    it('should handle empty records', () => {
      const report = generateAttendanceReport([])
      
      expect(report.totalDays).toBe(0)
      expect(report.presentDays).toBe(0)
      expect(report.percentage).toBe(0)
      expect(report.status).toBe('Critical')
    })
  })

  describe('processStudentData', () => {
    it('should process student data correctly', () => {
      const students = [
        { name: 'john doe', email: 'john@example.com', rollNo: '1' },
        { name: '  alice smith  ', email: 'alice@test.com', rollNo: '2' },
        { name: 'bob', email: 'invalid-email', rollNo: '3' }
      ]
      
      const processed = processStudentData(students)
      
      expect(processed[0].name).toBe('JOHN DOE')
      expect(processed[0].isValid).toBe(true)
      expect(processed[1].name).toBe('ALICE SMITH')
      expect(processed[1].isValid).toBe(true)
      expect(processed[2].name).toBe('BOB')
      expect(processed[2].isValid).toBe(false)
    })

    it('should handle empty student list', () => {
      const processed = processStudentData([])
      expect(processed).toHaveLength(0)
    })
  })

  describe('validateStudentData', () => {
    it('should validate correct student data', () => {
      const student = {
        name: 'John Doe',
        email: 'john@example.com',
        rollNo: '123',
        division: 'I'
      }
      
      const result = validateStudentData(student)
      expect(result.isValid).toBe(true)
      expect(result.errors).toHaveLength(0)
    })

    it('should catch validation errors', () => {
      const student = {
        name: 'J',
        email: 'invalid-email',
        rollNo: 'abc',
        division: 'III'
      }
      
      const result = validateStudentData(student)
      expect(result.isValid).toBe(false)
      expect(result.errors).toHaveLength(4)
    })
  })

  describe('generateStudentId', () => {
    it('should generate student IDs correctly', () => {
      expect(generateStudentId('1', 'I')).toBe('STUI001')
      expect(generateStudentId('25', 'II')).toBe('STUII025')
      expect(generateStudentId('100', 'I')).toBe('STUI100')
    })
  })

  describe('formatDate', () => {
    it('should format dates correctly', () => {
      const date = '2024-01-15'
      const formatted = formatDate(date)
      expect(formatted).toContain('January')
      expect(formatted).toContain('2024')
    })
  })
})
