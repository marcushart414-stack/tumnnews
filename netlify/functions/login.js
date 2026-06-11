const { createClient } = require('@supabase/supabase-js')

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    }
  }

  const supabaseUrl = process.env.https://evtaizxntprnlitqxxyh.supabase.co
  const supabaseKey = process.env.eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV2dGFpenhudHBybmxpdHF4eHloIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MTIwODYxMCwiZXhwIjoyMDk2Nzg0NjEwfQ.QP3Fq9eSJU1xgsaReG6BVddmeQSxRbryKUgwpml8OUA
  const supabase = createClient(supabaseUrl, supabaseKey)

  const data = JSON.parse(event.body)

  if (!data.email || !data.password) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Email and password required' })
    }
  }

  try {
    // Get user by email
    const { data: user } = await supabase
      .from('users')
      .select('*')
      .eq('email', data.email)
      .single()

    if (!user) {
      return {
        statusCode: 401,
        body: JSON.stringify({ error: 'Invalid credentials' })
      }
    }

    // Verify password
    const bcrypt = require('bcryptjs')
    const passwordMatch = await bcrypt.compare(data.password, user.password_hash)

    if (!passwordMatch) {
      return {
        statusCode: 401,
        body: JSON.stringify({ error: 'Invalid credentials' })
      }
    }

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type'
      },
      body: JSON.stringify({
        success: true,
        message: 'Login successful',
        user: {
          id: user.id,
          email: user.email,
          first_name: user.first_name,
          last_name: user.last_name,
          role: user.role
        }
      })
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Login failed: ' + error.message })
    }
  }
}
