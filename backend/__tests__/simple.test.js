const { describe, it, expect } = require('@jest/globals')

describe('Simple Backend Tests', () => {
  it('should pass basic math test', () => {
    expect(2 + 2).toBe(4)
  })

  it('should handle string operations', () => {
    const name = 'John Doe'
    expect(name).toContain('John')
    expect(name.length).toBe(8)
  })

  it('should work with arrays', () => {
    const students = ['Alice', 'Bob', 'Charlie']
    expect(students).toHaveLength(3)
    expect(students).toContain('Bob')
  })

  it('should validate object properties', () => {
    const user = {
      id: 1,
      name: 'Test User',
      role: 'teacher',
      email: 'test@example.com'
    }
    
    expect(user).toHaveProperty('id', 1)
    expect(user).toHaveProperty('role', 'teacher')
    expect(user.email).toMatch(/@/)
  })
})
