export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  // Enable streaming
  res.setHeader('Content-Type', 'text/plain')
  res.setHeader('Transfer-Encoding', 'chunked')

  try {
    const response = await fetch('https://icvjf7t3purdrch3xk5nf2ex4e0dhaci.lambda-url.us-west-2.on.aws/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req.body),
    })

    const reader = response.body.getReader()

    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      
      res.write(value)
    }

    res.end()
  } catch (error) {
    console.error('Error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}
