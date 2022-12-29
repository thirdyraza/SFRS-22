import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import notifService from './notifServices'

const notification = JSON.parse(localStorage.getItem('notif'))
const initialState = {
    notification: notification ? notification : null,
    notifs: [],
    allNotifs: [notification],
    isSuccess: false,
    isLoading: false,
    isError: false,
    message: '',
}

// set notification
export const setNotif = createAsyncThunk('notifs/setNotif', async(notifData, thunkAPI) =>{
    try {
        const token = thunkAPI.getState().auth.user.token
        return await notifService.setNotif(notifData, token)
    } catch (error) {
        const message = (error.reponse && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// get notifications
export const getNotifs = createAsyncThunk('notifs/getNotifs', async(resid, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await notifService.getNotifs(resid, token)

    } catch (error) {
        const message = (error.reponse && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})


export const notifSlice = createSlice({
    name: 'notif',
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) =>{
        builder
            .addCase(setNotif.pending, (state) => {
                state.isLoading = true
            })
            .addCase(setNotif.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.notifs.push(action.payload)
            })
            .addCase(setNotif.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getNotifs.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getNotifs.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.notifs = action.payload
            })
            .addCase(getNotifs.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    }
})

export const {reset} = notifSlice.actions
export default notifSlice.reducer