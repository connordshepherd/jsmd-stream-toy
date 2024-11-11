export const config = {
  runtime: 'edge',
};

export default async function handler(req) {
  const { message } = await req.json();

  const response = await fetch(
    'https://icvjf7t3purdrch3xk5nf2ex4e0dhaci.lambda-url.us-west-2.on.aws/chat',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: "connortest1110644@gmail.com",
        message: message,
      }),
    }
  );

  // Forward the stream directly
  return new Response(response.body);
}
