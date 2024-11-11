import { useState } from 'react'

export default function Home() {
  const [response, setResponse] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleClick = async () => {
    setIsLoading(true)
    setResponse('')

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: "connortest1110644@gmail.com",
          message: "How many boxes of protein are in an in n out double double"
        }),
      })

      const reader = response.body.getReader()
      const decoder = new TextDecoder()

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        const text = decoder.decode(value)
        setResponse((prev) => prev + text)
      }
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setIsLoading(false)
    }
  }

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
