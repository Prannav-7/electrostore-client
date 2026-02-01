import React from 'react';
import FallbackElectricalAssistant from '../services/fallbackElectricalAssistant';

const TestChatGPT = () => {
  const [response, setResponse] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');
  const fallbackAssistant = new FallbackElectricalAssistant();

  const testChatGPT = async () => {
    setLoading(true);
    setError('');
    setResponse('');

    try {
      const result = fallbackAssistant.askElectricalQuestion(
        "What are the different types of electrical switches available?"
      );
      
      setResponse(`🏪 **Jaimaaruthi Electrical Store Assistant**\n\n${result.answer}`);
    } catch (err) {
      setError(`Error: ${err.message}`);
      console.error('Electrical Assistant Test Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const testProductRecommendation = async () => {
    setLoading(true);
    setError('');
    setResponse('');

    try {
      const result = fallbackAssistant.askElectricalQuestion(
        "I need lighting for my living room"
      );
      
      setResponse(`💡 **Product Recommendation**\n\n${result.answer}`);
    } catch (err) {
      setError(`Error: ${err.message}`);
      console.error('Product Recommendation Test Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const testSafetyAdvice = async () => {
    setLoading(true);
    setError('');
    setResponse('');

    try {
      const result = fallbackAssistant.askElectricalQuestion(
        "working with electrical wiring"
      );
      
      setResponse(`⚠️ **Safety Advice**\n\n${result.answer}`);
    } catch (err) {
      setError(`Error: ${err.message}`);
      console.error('Safety Advice Test Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const testFallbackAssistant = async () => {
    setLoading(true);
    setError('');
    setResponse('');

    try {
      const result = fallbackAssistant.askElectricalQuestion("Tell me about ceiling fans");
      setResponse(`🌀 **Ceiling Fan Guide**\n\n${result.answer}`);
    } catch (err) {
      setError(`Fallback Error: ${err.message}`);
      console.error('Fallback Test Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const style = {
    container: {
      padding: '20px',
      maxWidth: '800px',
      margin: '0 auto',
      fontFamily: 'Arial, sans-serif'
    },
    button: {
      backgroundColor: '#667eea',
      color: 'white',
      border: 'none',
      padding: '10px 20px',
      margin: '10px',
      borderRadius: '5px',
      cursor: 'pointer',
      fontSize: '14px'
    },
    response: {
      backgroundColor: '#f8fafc',
      border: '1px solid #e2e8f0',
      borderRadius: '8px',
      padding: '15px',
      marginTop: '20px',
      whiteSpace: 'pre-wrap',
      lineHeight: '1.5'
    },
    error: {
      backgroundColor: '#fed7d7',
      border: '1px solid #fc8181',
      borderRadius: '8px',
      padding: '15px',
      marginTop: '20px',
      color: '#c53030'
    },
    loading: {
      color: '#667eea',
      fontStyle: 'italic',
      marginTop: '20px'
    }
  };

  return (
    <div style={style.container}>
      <h1>🤖 ChatGPT Integration Test</h1>
      <p>Test the OpenAI ChatGPT integration for Jaimaaruthi Electrical Store</p>
      
      <div>
        <button 
          style={style.button} 
          onClick={testChatGPT}
          disabled={loading}
        >
          Test Electrical Question
        </button>
        
        <button 
          style={style.button} 
          onClick={testProductRecommendation}
          disabled={loading}
        >
          Test Product Recommendation
        </button>
        
        <button 
          style={style.button} 
          onClick={testSafetyAdvice}
          disabled={loading}
        >
          Test Safety Advice
        </button>
        
        <button 
          style={{...style.button, backgroundColor: '#28a745'}} 
          onClick={testFallbackAssistant}
          disabled={loading}
        >
          Test Fallback Assistant
        </button>
      </div>

      {loading && (
        <div style={style.loading}>
          🔄 Asking ChatGPT... Please wait.
        </div>
      )}

      {error && (
        <div style={style.error}>
          {error}
        </div>
      )}

      {response && (
        <div style={style.response}>
          <strong>ChatGPT Response:</strong><br /><br />
          {response}
        </div>
      )}
    </div>
  );
};

export default TestChatGPT;