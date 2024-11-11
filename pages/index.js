import { useState, useRef } from 'react';

export default function Home() {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setResponse('');

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });

      const reader = res.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        const text = decoder.decode(value);
        setResponse((prev) => prev + text);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="Enter your message..."
        />
        <button 
          type="submit" 
          disabled={isLoading}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
        >
          {isLoading ? 'Sending...' : 'Send'}
        </button>
      </form>

      <div className="whitespace-pre-wrap border rounded p-4 min-h-[100px]">
        {response || 'Response will appear here...'}
      </div>
    </div>
  );
}
