import { streamText } from 'ai';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    console.log('Starting request to Lambda');
    
    // Extract from req.body.prompt if it exists, otherwise use req.body
    const requestBody = req.body.prompt || req.body;
    console.log('Request body:', requestBody);

    const response = await fetch('https://icvjf7t3purdrch3xk5nf2ex4e0dhaci.lambda-url.us-west-2.on.aws/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: requestBody.email,
        message: requestBody.message
      })
    });

    console.log('Lambda response status:', response.status);
    const text = await response.text();
    console.log('Lambda response:', text);

    return res.status(200).json({ message: text });

  } catch (error) {
    console.error('Detailed error:', error);
    return res.status(500).json({ 
      message: 'Internal server error',
      error: error.message,
      stack: error.stack
    });
  }
}
