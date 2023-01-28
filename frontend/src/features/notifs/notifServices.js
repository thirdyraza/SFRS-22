import axios from "axios";

const API_URL = '/api/notifs/'

// create new notification
const setNotif = async(reserveData, token) =>{
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.post(API_URL, reserveData, config)

    if(response.data) {
        localStorage.setItem('notif', JSON.stringify(response.data))
    }

    return response.data
}

// get user notifications
const getNotifs = async(resid, token) =>{
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL + resid, config)
    return response.data
}

// get user notifications
const getAllNotifs = async(token) =>{
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL + 'all', config)
    return response.data
}

// get notifications for org adviser/head of office
const getHeadNotifs = async(token) =>{
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL + 'head', config)
    return response.data
}
// get notifications for dept deans
const getDeanNotifs = async(token) =>{
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL + 'dean', config)
    return response.data
}
// get notifications for osas dean
const getOsasNotifs = async(token) =>{
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL + 'osas', config)
    return response.data
}
// get notifications for venue in-charge
const getVenicNotifs = async(token, notifID) =>{
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL + 'venic/' + notifID, config)
    return response.data
} 

// update read status
const readNotif = async(notifID, token) =>{
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.put(API_URL + 'reading/' + notifID, config)
    return response.data
}

// get unread notifs
const getUnread = async(token) =>{
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL + 'reading/', config)
    return response.data
}

const notifService = {
    setNotif,
    getNotifs,
    getAllNotifs,
    getHeadNotifs,
    getDeanNotifs,
    getOsasNotifs,
    getVenicNotifs,
    readNotif,
    getUnread,
}

export default notifService