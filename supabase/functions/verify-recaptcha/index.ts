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
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { token } = await req.json()
    console.log('Received verification request with token:', token ? 'present' : 'missing')
    
    if (!token) {
      throw new Error('Token is required')
    }

    const secretKey = Deno.env.get('RECAPTCHA_SECRET_KEY')
    if (!secretKey) {
      console.error('RECAPTCHA_SECRET_KEY not configured')
      throw new Error('RECAPTCHA_SECRET_KEY not configured')
    }

    console.log('Verifying token with Google reCAPTCHA API...')
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `secret=${secretKey}&response=${token}`,
    })

    const data = await response.json()
    console.log('reCAPTCHA verification response:', data)

    if (!data.success) {
      console.error('Verification failed:', data['error-codes'])
      throw new Error('Verification failed')
    }

    return new Response(
      JSON.stringify({ success: true }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )
  } catch (error) {
    console.error('Verification error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      },
    )
  }
})