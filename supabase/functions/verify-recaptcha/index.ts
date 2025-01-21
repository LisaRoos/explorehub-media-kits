import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Max-Age': '86400',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { token } = await req.json()
    console.log('Received token for verification, checking validity...')
    
    if (!token) {
      console.error('No token provided in request body')
      throw new Error('Token is required')
    }

    const secretKey = Deno.env.get('RECAPTCHA_SECRET_KEY')
    if (!secretKey) {
      console.error('RECAPTCHA_SECRET_KEY not found in environment variables')
      throw new Error('Server configuration error')
    }

    console.log('Sending verification request to Google reCAPTCHA API...')
    const verifyUrl = 'https://www.google.com/recaptcha/api/siteverify'
    const formData = new URLSearchParams();
    formData.append('secret', secretKey);
    formData.append('response', token);

    const response = await fetch(verifyUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData.toString(),
    })

    const data = await response.json()
    console.log('Google reCAPTCHA API Response:', {
      success: data.success,
      errorCodes: data['error-codes'],
      score: data.score,
      action: data.action,
      timestamp: data.challenge_ts
    })

    if (!data.success) {
      console.error('Verification failed:', {
        errorCodes: data['error-codes'],
        timestamp: new Date().toISOString()
      })
      throw new Error(`Verification failed: ${data['error-codes']?.join(', ') || 'unknown error'}`)
    }

    console.log('Verification successful!')
    return new Response(
      JSON.stringify({ 
        success: true,
        verification: {
          timestamp: data.challenge_ts,
          score: data.score,
          action: data.action
        }
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )
  } catch (error) {
    console.error('Error during verification:', error)
    return new Response(
      JSON.stringify({ 
        error: error.message,
        success: false,
        timestamp: new Date().toISOString()
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      },
    )
  }
})