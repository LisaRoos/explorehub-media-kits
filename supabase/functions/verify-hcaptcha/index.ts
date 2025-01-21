import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { token } = await req.json()
    
    if (!token) {
      throw new Error('Token is required')
    }

    const secretKey = Deno.env.get('HCAPTCHA_SECRET_KEY')
    if (!secretKey) {
      throw new Error('HCAPTCHA_SECRET_KEY not configured')
    }

    // Verify the token with hCaptcha
    const verifyUrl = 'https://api.hcaptcha.com/siteverify'
    const formData = new URLSearchParams()
    formData.append('secret', secretKey)
    formData.append('response', token)

    const response = await fetch(verifyUrl, {
      method: 'POST',
      body: formData,
    })

    const data = await response.json()
    console.log('hCaptcha verification response:', data)

    if (!data.success) {
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