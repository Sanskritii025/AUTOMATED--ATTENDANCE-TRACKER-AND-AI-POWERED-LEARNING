import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import React from 'react'

// Simple component for testing
function TestComponent({ title, children }) {
  return (
    <div>
      <h1>{title}</h1>
      {children}
    </div>
  )
}

describe('Component Testing', () => {
  it('renders a simple component', () => {
    render(<TestComponent title="Test Title">Test Content</TestComponent>)
    
    expect(screen.getByText('Test Title')).toBeInTheDocument()
    expect(screen.getByText('Test Content')).toBeInTheDocument()
  })

  it('handles props correctly', () => {
    const { rerender } = render(<TestComponent title="Initial Title" />)
    
    expect(screen.getByText('Initial Title')).toBeInTheDocument()
    
    rerender(<TestComponent title="Updated Title" />)
    expect(screen.getByText('Updated Title')).toBeInTheDocument()
  })
})
