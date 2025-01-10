/** @jsxImportSource @emotion/react */
import { useCollatzStore } from '../store/collatzStore';

const getCollatzLoops = (n: number): number => {
  let count = 0;
  while (n !== 1) {
    n = n % 2 === 0 ? n / 2 : 3 * n + 1;
    count++;
  }
  return count;
};

const Collatz = () => {
  const { input, result, setInput, setResult } = useCollatzStore();

  const handleCalculate = () => {
    if (typeof input === 'number') {
      setResult(getCollatzLoops(input));
    }
  };
  const handleReset = () => {
    setInput('');
    setResult(null);
  };
  return (
    <div
      css={{
        padding: '2rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1rem',
      }}
    >
      <h1
      css={{
        textAlign:'center',
        margin:'2rem'
      }}>
        <span style={{ fontWeight: 'bold' }}>Collatz</span>{' '}
        <span style={{ fontWeight: 'normal' }}>Conjecture</span>
      </h1>
      <input
        type="number"
        value={input}
        onChange={(e) => setInput(e.target.value ? parseInt(e.target.value) : '')}
        placeholder="Enter a number"
        css={{ padding: '0.5rem', fontSize: '1rem', width: '200px' }}
      />
      <button onClick={handleCalculate} css={{
            backgroundColor: '#000000',
            color: '#fff',
            border: 'none',
            padding: '0.5rem 3rem',
            cursor: 'pointer',
            borderRadius: '0.5rem',
            ':hover': { backgroundColor: '#45a049' },
          }}>
        Calculate
      </button>
      <button onClick={handleReset} css={{
              backgroundColor: '#ff4d4f',
              color: '#fff',
              border: 'none',
              padding: '0.5rem 3rem',
              cursor: 'pointer',
              borderRadius: '0.5rem',
              ':hover': { backgroundColor: '#ff7875' },
            }}>
        Reset
      </button>
      <div
        css={{
          marginTop: '2rem',
          padding: '2rem',
          border: '2px solid #000',
          borderRadius: '8px',
          fontSize: '2rem',
          fontWeight: 'bold',
          textAlign: 'center',
          width: '300px',
          height: '150px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {result !== null ? result : '-'}
      </div>
    </div>
  );
};

export default Collatz;
