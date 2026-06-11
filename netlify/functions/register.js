const { createClient } = require('@supabase/supabase-js')

exports.handler = async (event) => {
  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json'
  }

  // Handle OPTIONS
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' }
  }

  // Only POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    }
  }

  try {
    // Get environment variables
    const supabaseUrl = process.env.SUPABASE_URL
    const supabaseKey = process.env.SUPABASE_ANON_KEY  // Changed to ANON key

    // Check if env vars exist
    if (!supabaseUrl || !supabaseKey) {
      console.error('Missing env vars:', { supabaseUrl: !!supabaseUrl, supabaseKey: !!supabaseKey })
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ 
          error: 'Server configuration error',
          details: 'Environment variables not set'
        })
      }
    }

    // Create Supabase client
    const supabase = createClient(supabaseUrl, supabaseKey)

    // Parse request
    const data = JSON.parse(event.body)

    // Validate
    if (!data.email || !data.password || !data.first_name || !data.last_name) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'All fields required' })
      }
    }

    // Use Supabase Auth to create user (no bcrypt needed!)
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          first_name: data.first_name,
          last_name: data.last_name
        }
      }
    })

    if (authError) {
      console.error('Auth error:', authError)
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: authError.message })
      }
    }

    // Also insert into our custom users table
    const { error: dbError } = await supabase
      .from('users')
      .insert([{
        email: data.email,
        password_hash: 'using_supabase_auth',  // We don't need to store this anymore
        first_name: data.first_name,
        last_name: data.last_name,
        role: 'member'
      }])

    if (dbError) {
      console.error('DB error:', dbError)
      // Auth user was created, so don't return error
    }

    return {
      statusCode: 201,
      headers,
      body: JSON.stringify({
        success: true,
        message: 'Registration successful',
        user: {
          email: data.email,
          first_name: data.first_name,
          last_name: data.last_name
        }
      })
    }

  } catch (error) {
    console.error('Function error:', error)
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Registration failed',
        details: error.message
      })
    }
  }
}
