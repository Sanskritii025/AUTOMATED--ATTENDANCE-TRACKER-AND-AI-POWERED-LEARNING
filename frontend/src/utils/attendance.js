// Real utility functions for the attendance system
// This file will be covered by tests

export function calculateAttendancePercentage(present, total) {
  if (total === 0) return 0
  return Math.round((present / total) * 100)
}

export function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function formatStudentName(name) {
  return name.trim().toUpperCase()
}

export function generateAttendanceReport(records) {
  const totalDays = records.length
  const presentDays = records.filter(r => r.status === 'present').length
  const absentDays = totalDays - presentDays
  const percentage = calculateAttendancePercentage(presentDays, totalDays)
  
  return {
    totalDays,
    presentDays,
    absentDays,
    percentage,
    status: percentage >= 75 ? 'Good' : percentage >= 50 ? 'Warning' : 'Critical'
  }
}

export function processStudentData(students) {
  return students.map(student => ({
    ...student,
    name: formatStudentName(student.name),
    isValid: validateEmail(student.email)
  }))
}

export function validateStudentData(student) {
  const errors = []
  
  if (!student.name || student.name.trim().length < 2) {
    errors.push('Name must be at least 2 characters')
  }
  
  if (!student.email || !validateEmail(student.email)) {
    errors.push('Valid email is required')
  }
  
  if (!student.rollNo || !/^\d+$/.test(student.rollNo)) {
    errors.push('Valid roll number is required')
  }
  
  if (!student.division || !['I', 'II'].includes(student.division)) {
    errors.push('Division must be I or II')
  }
  
  return {
    isValid: errors.length === 0,
    errors
  }
}

export function generateStudentId(rollNo, division) {
  return `STU${division}${rollNo.padStart(3, '0')}`
}

export function formatDate(date) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
