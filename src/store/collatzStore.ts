import { create } from 'zustand';


interface collatzState {
    input: number | '';
    result: number | null;
    setInput:(value:number |'') => void;
    setResult:(value:number | null) => void;
}

export const useCollatzStore = create<collatzState>((set)=>({
    input: '',
    result: null,
    setInput: (value) => set({ input: value }),
    setResult: (value) => set({ result: value }),
 }));