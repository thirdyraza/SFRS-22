import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import reserveService from './reserveService'

const reservation = JSON.parse(localStorage.getItem('reserve'))
const initialState = {
    reservation: reservation ? reservation: null,
    reserves: [],
    allReserves: [reservation],
    forReviews: [reservation],
    forChecks: [reservation],
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
export const getReservation = createAsyncThunk('reserves/getOne', async(resID, thunkAPI) => {
    try {
        return await reserveService.getReservation(resID)
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

// get reservation for reviewing
export const getForReview = createAsyncThunk('reserves/review', async(_id, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await reserveService.getForReview(token)

    } catch (error) {
        const message = (error.reponse && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// get reservation for checking
export const getForCheck = createAsyncThunk('reserves/check', async(_id, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await reserveService.getForCheck(token)

    } catch (error) {
        const message = (error.reponse && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// update reservation
export const updateReserve = createAsyncThunk('reserves/update', async(resID, thunkAPI) =>{
    try {
        return await reserveService.updateReserve(resID)
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
            .addCase(getForReview.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getForReview.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.forReviews = action.payload
            })
            .addCase(getForReview.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getForCheck.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getForCheck.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.forChecks = action.payload
            })
            .addCase(getForCheck.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(updateReserve.pending, (state) => {
                state.isLoading = true
            })
            .addCase(updateReserve.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.reserves = state.reserves.filter((reserve) => reserve._id !== action.payload.id)
            })
            .addCase(updateReserve.rejected, (state, action) => {
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