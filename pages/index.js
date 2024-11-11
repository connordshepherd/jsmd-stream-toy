import { useState } from 'react';
import { useCompletion } from 'ai/react';

export default function Home() {
  const [response, setResponse] = useState('');

  const { complete, isLoading } = useCompletion({
    api: '/api/chat',
    onFinish: (prompt, completion) => {
      console.log('Finished!', completion);
    },
  });

  const handleClick = async () => {
    setResponse('');
    const completion = await complete({
      email: "connortest1110644@gmail.com",
      message: "How many boxes of protein are in an in n out double double"
    }, {
      onStreamingChunk: (chunk) => {
        setResponse(prev => prev + chunk);
      },
    });
  };

  return (
    <div style={{ padding: '20px' }}>
      <button 
        onClick={handleClick}
        disabled={isLoading}
        style={{ 
          padding: '10px 20px',
          marginBottom: '20px'
        }}
      >
        {isLoading ? 'Loading...' : 'Generate Response'}
      </button>
      
      <div style={{ 
        whiteSpace: 'pre-wrap',
        border: '1px solid #ccc',
        padding: '10px',
        minHeight: '100px'
      }}>
        {response || 'Response will appear here...'}
      </div>
    </div>
  )
}
