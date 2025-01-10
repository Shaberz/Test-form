import { create } from 'zustand';

interface FibonacciState {
  input: number | '';
  result: [number, number] | null;
  setInput: (value: number | '') => void;
  setResult: (value: [number, number] | null) => void;
}

export const useFibonacciStore = create<FibonacciState>((set) => ({
  input: '',
  result: null,
  setInput: (value) => set({ input: value }),
  setResult: (value) => set({ result: value }),
}));