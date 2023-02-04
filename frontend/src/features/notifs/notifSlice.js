import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import notifService from './notifServices'

const notification = JSON.parse(localStorage.getItem('notif'))
const initialState = {
    notification: notification ? notification : null,
    notifs: [],
    allNotifs: [notification],
    headNotifs: [notification],
    deanNotifs: [notification],
    osasNotifs: [notification],
    venicNotifs: [notification],
    reading: [notification],
    isSuccess: false,
    isLoading: false,
    isError: false,
    message: '',
}

// set notification
export const setNotif = createAsyncThunk('notifs/createNotifs', async(notifData, thunkAPI) =>{
    try {
        const token = thunkAPI.getState().auth.user.token
        return await notifService.setNotif(notifData, token)
    } catch (error) {
        const message = (error.reponse && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// get notifications
export const getNotifs = createAsyncThunk('notifs/fetchNotifs', async(resid, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await notifService.getNotifs(resid, token)

    } catch (error) {
        const message = (error.reponse && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// get all notifications
export const getAllNotifs = createAsyncThunk('notifs/getAll', async(_id, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await notifService.getAllNotifs(token)
    } catch (error) {
        const message = (error.reponse && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// get notifications for org advisers/head of office
export const getHeadNotifs = createAsyncThunk('notifs/getForHead', async(_id, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await notifService.getHeadNotifs(token)

    } catch (error) {
        const message = (error.reponse && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// get notifications for dept deans
export const getDeanNotifs = createAsyncThunk('notifs/getForDean', async(_id, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await notifService.getDeanNotifs(token)

    } catch (error) {
        const message = (error.reponse && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// get notifications for org advisers/head of office
export const getOsasNotifs = createAsyncThunk('notifs/getForOsas', async(_id, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await notifService.getOsasNotifs(token)

    } catch (error) {
        const message = (error.reponse && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// get notifications for venue in-charge
export const getVenicNotifs = createAsyncThunk('notifs/getForVenic', async(notifID, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await notifService.getVenicNotifs(token, notifID)

    } catch (error) {
        const message = (error.reponse && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// update read status
export const readNotif = createAsyncThunk('notifs/updateRead', async(notifID, _id, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await notifService.readNotif(notifID, token)

    } catch (error) {
        const message = (error.reponse && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// get unread notifs
export const getUnread = createAsyncThunk('notifs/unread', async(_id, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await notifService.getUnread(token)

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
            .addCase(getAllNotifs.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getAllNotifs.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.allNotifs = action.payload
            })
            .addCase(getAllNotifs.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getHeadNotifs.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getHeadNotifs.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.headNotifs = action.payload
            })
            .addCase(getHeadNotifs.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getDeanNotifs.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getDeanNotifs.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.deanNotifs = action.payload
            })
            .addCase(getDeanNotifs.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getOsasNotifs.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getOsasNotifs.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.osasNotifs = action.payload
            })
            .addCase(getOsasNotifs.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getVenicNotifs.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getVenicNotifs.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.venicNotifs = action.payload
            })
            .addCase(getVenicNotifs.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    }
})

export const {reset} = notifSlice.actions
export default notifSlice.reducer