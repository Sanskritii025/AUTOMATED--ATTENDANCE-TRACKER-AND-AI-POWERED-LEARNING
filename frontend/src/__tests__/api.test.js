import { describe, it, expect, vi } from 'vitest'

// Mock API functions that would be in your services/api.js
const mockApi = {
  async login(email, password) {
    if (email === 'teacher@cse.pune' && password === 'teacher123') {
      return {
        success: true,
        user: { id: '1', name: 'Dr Sagar Mohite', role: 'teacher' },
        token: 'mock-token'
      }
    }
    throw new Error('Invalid credentials')
  },

  async getStudents(division = null) {
    const students = [
      { id: '1', name: 'AYUSH ADITYA', rollNo: '1', division: 'I' },
      { id: '2', name: 'MANAN AGARWAL', rollNo: '2', division: 'I' },
      { id: '3', name: 'SOMIL AGRAWAL', rollNo: '3', division: 'II' }
    ]
    
    if (division) {
      return students.filter(s => s.division === division)
    }
    return students
  },

  async markAttendance(date, attendanceData) {
    if (!date || !Array.isArray(attendanceData)) {
      throw new Error('Invalid attendance data')
    }
    return { success: true, message: 'Attendance marked successfully' }
  },

  async getAttendanceStats(studentId) {
    return {
      success: true,
      stats: {
        totalDays: 20,
        presentDays: 18,
        absentDays: 2,
        percentage: 90
      }
    }
  }
}

describe('API Functions', () => {
  it('should login with valid teacher credentials', async () => {
    const result = await mockApi.login('teacher@cse.pune', 'teacher123')
    
    expect(result.success).toBe(true)
    expect(result.user.role).toBe('teacher')
    expect(result.token).toBeDefined()
  })

  it('should reject invalid login credentials', async () => {
    await expect(mockApi.login('invalid@email.com', 'wrongpass'))
      .rejects.toThrow('Invalid credentials')
  })

  it('should get all students', async () => {
    const students = await mockApi.getStudents()
    
    expect(students).toHaveLength(3)
    expect(students[0]).toHaveProperty('name', 'AYUSH ADITYA')
  })

  it('should filter students by division', async () => {
    const divisionI = await mockApi.getStudents('I')
    const divisionII = await mockApi.getStudents('II')
    
    expect(divisionI).toHaveLength(2)
    expect(divisionII).toHaveLength(1)
    expect(divisionI.every(s => s.division === 'I')).toBe(true)
  })

  it('should mark attendance successfully', async () => {
    const attendanceData = [
      { studentId: '1', status: 'present' },
      { studentId: '2', status: 'absent' }
    ]
    
    const result = await mockApi.markAttendance('2024-01-15', attendanceData)
    
    expect(result.success).toBe(true)
    expect(result.message).toContain('marked successfully')
  })

  it('should reject invalid attendance data', async () => {
    await expect(mockApi.markAttendance(null, []))
      .rejects.toThrow('Invalid attendance data')
  })

  it('should get attendance stats', async () => {
    const stats = await mockApi.getAttendanceStats('1')
    
    expect(stats.success).toBe(true)
    expect(stats.stats.totalDays).toBe(20)
    expect(stats.stats.percentage).toBe(90)
  })
})
