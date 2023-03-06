import axios from "axios";

const API_URL = '/api/notifs/'

// create new notification
const setNotif = async(notifData, token) =>{
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.post(API_URL, notifData, config)

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


const notifService = {
    setNotif,
    getNotifs,
    getAllNotifs,
    getHeadNotifs,
    getDeanNotifs,
    getOsasNotifs,
    getVenicNotifs,
}

export default notifService