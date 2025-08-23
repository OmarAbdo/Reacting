import { create } from 'zustand';

interface CounterState {
    count: number;
    increment: () => void;
    decrement: () => void;
}


const useCounterStore = create<CounterState>((set) => ({
    count: 0, // initial state 
    increment: () => set((state) => ({ count: state.count + 1 })), // action to increment
    decrement: () => set((state) => ({ count: state.count - 1 })), // action to decrement
}))

export default useCounterStore;