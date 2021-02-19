require('dotenv').config()
const fetch = require('node-fetch')

export default async (req, res) => {
  const { email } = req.body

  if (!email) {
    return res.status(400).json({ error: 'Email is required' })
  }

  try {
    const API_KEY = process.env.BUTTONDOWN_API_KEY
    const response = await fetch(
      `https://api.buttondown.email/v1/subscribers`,
      {
        body: JSON.stringify({ email }),
        headers: {
          Authorization: `Token ${API_KEY}`,
          'Content-Type': 'application/json'
        },
        method: 'POST'
      }
    )

    if (response.status >= 400) {
      return res.redirect(303, '/subscribe/error')
    }

    return res.redirect(303, '/subscribe/success')
  } catch (error) {
    console.log(error)
    return res.redirect(303, '/subscribe/error')
  }
}