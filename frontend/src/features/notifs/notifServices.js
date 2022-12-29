import axios from "axios";

const API_URL = '/api/notifs/'

// create new reservation
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

// get user reservations
const getNotifs = async(resid, token) =>{
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL + resid, config)
    return response.data
}

const notifService = {
    setNotif,
    getNotifs,
}

export default notifService