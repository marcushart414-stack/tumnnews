const API_URL = '/.netlify/functions'

export const api = {
  async register(userData: {
    email: string
    password: string
    first_name: string
    last_name: string
  }) {
    const response = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    })
    
    const data = await response.json()
    
    if (!response.ok) {
      throw new Error(data.error || 'Registration failed')
    }
    
    return data
  },

  async login(email: string, password: string) {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })
    
    const data = await response.json()
    
    if (!response.ok) {
      throw new Error(data.error || 'Login failed')
    }
    
    return data
  }
}
