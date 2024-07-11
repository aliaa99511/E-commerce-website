import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    counter: 0
}
const CounterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        increase: (state) => {
            state.counter += 1
        },
        decrease: (state) => {
            state.counter -= 1
        },
        increaseByAmount: (state, action) => {
            state.counter += action.payload
        }
    }
})

export let { increase, decrease, increaseByAmount } = CounterSlice.actions

export let counterReducer = CounterSlice.reducer