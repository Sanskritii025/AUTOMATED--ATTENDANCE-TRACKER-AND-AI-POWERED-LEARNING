import { describe, it, expect } from 'vitest'

// Mock authentication context and functions
class MockAuthContext {
  constructor() {
    this.user = null
    this.isAuthenticated = false
  }

  login(email, password) {
    if (email === 'teacher@cse.pune' && password === 'teacher123') {
      this.user = {
        id: '1',
        name: 'Dr Sagar Mohite',
        email: 'teacher@cse.pune',
        role: 'teacher'
      }
      this.isAuthenticated = true
      return Promise.resolve(this.user)
    }
    
    if (email === 'aditya100ayush@gmail.com' && password === 'student123') {
      this.user = {
        id: '2',
        name: 'AYUSH ADITYA',
        email: 'aditya100ayush@gmail.com',
        rollNo: '1',
        role: 'student'
      }
      this.isAuthenticated = true
      return Promise.resolve(this.user)
    }
    
    return Promise.reject(new Error('Invalid credentials'))
  }

  logout() {
    this.user = null
    this.isAuthenticated = false
  }

  getCurrentUser() {
    return this.user
  }
}

describe('Authentication System', () => {
  let authContext

  beforeEach(() => {
    authContext = new MockAuthContext()
  })

  it('should login teacher with valid credentials', async () => {
    const user = await authContext.login('teacher@cse.pune', 'teacher123')
    
    expect(user.role).toBe('teacher')
    expect(user.name).toBe('Dr Sagar Mohite')
    expect(authContext.isAuthenticated).toBe(true)
  })

  it('should login student with valid credentials', async () => {
    const user = await authContext.login('aditya100ayush@gmail.com', 'student123')
    
    expect(user.role).toBe('student')
    expect(user.rollNo).toBe('1')
    expect(authContext.isAuthenticated).toBe(true)
  })

  it('should reject invalid credentials', async () => {
    await expect(authContext.login('invalid@email.com', 'wrongpass'))
      .rejects.toThrow('Invalid credentials')
    
    expect(authContext.isAuthenticated).toBe(false)
  })

  it('should logout user', () => {
    authContext.user = { id: '1', name: 'Test User' }
    authContext.isAuthenticated = true
    
    authContext.logout()
    
    expect(authContext.user).toBeNull()
    expect(authContext.isAuthenticated).toBe(false)
  })

  it('should get current user', () => {
    const testUser = { id: '1', name: 'Test User', role: 'teacher' }
    authContext.user = testUser
    
    expect(authContext.getCurrentUser()).toEqual(testUser)
  })

  it('should handle role-based access', async () => {
    const teacher = await authContext.login('teacher@cse.pune', 'teacher123')
    expect(teacher.role).toBe('teacher')
    
    authContext.logout()
    
    const student = await authContext.login('aditya100ayush@gmail.com', 'student123')
    expect(student.role).toBe('student')
  })
})
