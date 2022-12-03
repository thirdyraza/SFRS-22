import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import reserveService from './reserveService'

const reservation = JSON.parse(localStorage.getItem('reserve'))
const initialState = {
    reservation: reservation ? reservation: null,
    reserves: [],
    allReserves: [reservation],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

// create reservation
export const createReserve =createAsyncThunk('reserves/create', async(reserveData, thunkAPI) =>{
    try {
        const token = thunkAPI.getState().auth.user.token
        return await reserveService.createReserve(reserveData, token)
    } catch (error) {
        const message = (error.reponse && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// get user reservation
export const getReserves = createAsyncThunk('reserves/getMine', async(_id, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await reserveService.getReserves(token)

    } catch (error) {
        const message = (error.reponse && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// get current reservation
export const getReservation = createAsyncThunk('reserves/getOne', async(_id, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await reserveService.getReservation(token)

    } catch (error) {
        const message = (error.reponse && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// get all reservation
export const getAllReserves = createAsyncThunk('reserves/getAll', async(_id, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await reserveService.getAllReserves(token)

    } catch (error) {
        const message = (error.reponse && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// delete user reservation
export const deleteReserve = createAsyncThunk('reserves/delete', async(id, thunkAPI) =>{
    try {
        const token = thunkAPI.getState().auth.user.token
        return await reserveService.deleteReserve(id, token)
    } catch (error) {
        const message = (error.reponse && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const reserveSlice = createSlice({
    name: 'reserve',
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(createReserve.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createReserve.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.reserves.push(action.payload)
            })
            .addCase(createReserve.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getReserves.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getReserves.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.reserves = action.payload
            })
            .addCase(getReserves.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getReservation.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getReservation.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.reservation = action.payload
            })
            .addCase(getReservation.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })            
            .addCase(getAllReserves.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getAllReserves.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.allReserves = action.payload
            })
            .addCase(getAllReserves.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(deleteReserve.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deleteReserve.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.reserves = state.reserves.filter((reserve) => reserve._id !== action.payload.id)
            })
            .addCase(deleteReserve.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    }
})

export const {reset} = reserveSlice.actions
export default reserveSlice.reducer