import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import reserveService from './reserveService'

const reservation = JSON.parse(localStorage.getItem('reserve'))
const initialState = {
    reservation: reservation ? reservation: null,
    reserves: [],
    reservesDash: [],
    existings: [reservation],
    allReserves: [reservation],
    forReviews: [reservation],
    forReviewsDash: [reservation],
    forChecks: [reservation],
    forChecksDash: [reservation],
    forDeans: [reservation],
    forDeansDash: [reservation],
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

// create temporary values
// export const setTemp = createAsyncThunk('reserves/setTemp', async(tempData, thunkAPI) =>{
//     try {
//         const token = thunkAPI.getState().auth.user.token
//         return await reserveService.setTemp(tempData, token)
//     } catch (error) {
//         const message = (error.reponse && error.response.data && error.response.data.message) || error.message || error.toString()
//         return thunkAPI.rejectWithValue(message)
//     }
// })

// // get temporary values
// export const getTemp = createAsyncThunk('reserves/getTemp', async(_id, thunkAPI) => {
//     try {
//         const token = thunkAPI.getState().auth.user.token
//         return await reserveService.getTemp(token)
//     } catch (error) {
//         const message = (error.reponse && error.response.data && error.response.data.message) || error.message || error.toString()
//         return thunkAPI.rejectWithValue(message)
//     }
// })

// // delete temporary values
// export const deleteTemp = createAsyncThunk('reserves/deleteTemp', async(tempId, thunkAPI) =>{
//     try {
//         const token = thunkAPI.getState().auth.user.token
//         return await reserveService.deleteTemp(tempId, token)
//     } catch (error) {
//         const message = (error.reponse && error.response.data && error.response.data.message) || error.message || error.toString()
//         return thunkAPI.rejectWithValue(message)
//     }
// })

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

// get user reservation
export const getReservesDash = createAsyncThunk('reserves/dashMine', async(_id, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await reserveService.getReservesDash(token)

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
// get reservation for reviewing
export const getForReviewDash = createAsyncThunk('reserves/dashReview', async(_id, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await reserveService.getForReviewDash(token)

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
// get reservation for checking
export const getForCheckDash = createAsyncThunk('reserves/dashCheck', async(_id, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await reserveService.getForCheckDash(token)

    } catch (error) {
        const message = (error.reponse && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// get reservation for deans
export const getForDean = createAsyncThunk('reserves/deans', async(_id, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await reserveService.getForDean(token)

    } catch (error) {
        const message = (error.reponse && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})
// get reservation for deans
export const getForDeanDash = createAsyncThunk('reserves/dashDeans', async(_id, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await reserveService.getForDeanDash(token)

    } catch (error) {
        const message = (error.reponse && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// update reservation
export const updateReserve = createAsyncThunk('reserves/update', async(updateData, thunkAPI) =>{
    try {
        return await reserveService.updateReserve(updateData)
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
            .addCase(getReservesDash.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getReservesDash.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.reservesDash = action.payload
            })
            .addCase(getReservesDash.rejected, (state, action) => {
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
            .addCase(getForReviewDash.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getForReviewDash.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.forReviewsDash = action.payload
            })
            .addCase(getForReviewDash.rejected, (state, action) => {
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
            .addCase(getForCheckDash.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getForCheckDash.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.forChecksDash = action.payload
            })
            .addCase(getForCheckDash.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getForDean.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getForDean.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.forDeans = action.payload
            })
            .addCase(getForDean.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getForDeanDash.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getForDeanDash.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.forDeansDash = action.payload
            })
            .addCase(getForDeanDash.rejected, (state, action) => {
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