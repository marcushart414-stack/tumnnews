const { createClient } = require('@supabase/supabase-js')

exports.handler = async (event) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    }
  }

  // Get Supabase credentials from environment variables
  const supabaseUrl = process.env.https://evtaizxntprnlitqxxyh.supabase.co
  const supabaseKey = process.env.eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV2dGFpenhudHBybmxpdHF4eHloIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MTIwODYxMCwiZXhwIjoyMDk2Nzg0NjEwfQ.QP3Fq9eSJU1xgsaReG6BVddmeQSxRbryKUgwpml8OUA
  const supabase = createClient(supabaseUrl, supabaseKey)

  // Parse the request body
  const data = JSON.parse(event.body)

  // Validate input
  if (!data.email || !data.password || !data.first_name || !data.last_name) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'All fields are required' })
    }
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(data.email)) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Invalid email format' })
    }
  }

  try {
    // Check if email already exists
    const { data: existingUser } = await supabase
      .from('users')
      .select('id')
      .eq('email', data.email)
      .single()

    if (existingUser) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Email already registered' })
      }
    }

    // Hash password using bcrypt
    const bcrypt = require('bcryptjs')
    const password_hash = await bcrypt.hash(data.password, 10)

    // Create user
    const { data: newUser, error } = await supabase
      .from('users')
      .insert([
        {
          email: data.email,
          password_hash: password_hash,
          first_name: data.first_name,
          last_name: data.last_name,
          role: 'member'
        }
      ])
      .select()
      .single()

    if (error) throw error

    return {
      statusCode: 201,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type'
      },
      body: JSON.stringify({
        success: true,
        message: 'Registration successful',
        user: {
          email: newUser.email,
          first_name: newUser.first_name,
          last_name: newUser.last_name
        }
      })
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Registration failed: ' + error.message })
    }
  }
}
