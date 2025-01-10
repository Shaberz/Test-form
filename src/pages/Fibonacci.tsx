/** @jsxImportSource @emotion/react */
import { useFibonacciStore } from '../store/fibonacciStore';

const getFibonacci = (n: number): [number, number] => {
  if (n === 0) return [0, 1];
  let a = 0,
    b = 1;
  while (b <= n) {
    const temp = b;
    b = a + b;
    a = temp;
  }
  return [a, b];
};

const Fibonacci = () => {
  const {input, result, setInput, setResult} = useFibonacciStore();

  const handleCalculate = () => {
    if (typeof input === 'number') {
      setResult(getFibonacci(input));
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
      <h1>Fibonacci Calculator</h1>
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
            marginTop: '1rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '30rem',
            backgroundColor: '#f0f0f0',
            padding: '1rem',
            borderRadius: '8px',
            gap: '0.5rem',
          }}
        >
          {/* Previous Fibonacci (Left) */}
          <div
            css={{
              width: '15rem',
              padding: '1rem',
              border: '2px solid #000',
              borderRadius: '8px',
              fontSize: '2rem',
              fontWeight: 'bold',
              textAlign: 'center',
              height: '150px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {result ? result[0] : '-'}
          </div>

          {/* Input number (Center) */}
          <div
            css={{
              width: '15rem',
              padding: '1rem',
              border: '2px solid #000',
              borderRadius: '8px',
              fontSize: '2rem',
              fontWeight: 'bold',
              textAlign: 'center',
              height: '150px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {input !== null ? input : '-'}
          </div>

          {/* Next Fibonacci (Right) */}
          <div
            css={{
              width: '15rem',
              padding: '1rem',
              border: '2px solid #000',
              borderRadius: '8px',
              fontSize: '2rem',
              fontWeight: 'bold',
              textAlign: 'center',
              height: '150px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {result ? result[1] : '-'}
          </div>
        </div>
    </div>
  );
};

export default Fibonacci;
