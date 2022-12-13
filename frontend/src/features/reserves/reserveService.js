import axios from "axios";

const API_URL = '/api/reserves/'

// create new reservation
const createReserve = async(reserveData, token) =>{
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.post(API_URL, reserveData, config)

    if(response.data) {
        localStorage.setItem('reserve', JSON.stringify(response.data))
    }

    return response.data
}

// get user reservations
const getReserves = async(token) =>{
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL, config)
    return response.data
}

// get reservation
const getReservation = async(resID) =>{
    const response = await axios.get(API_URL + resID)
    return response.data
}

// get all reservations
const getAllReserves = async(token) =>{
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL + 'all', config)
    return response.data
}

// get reservation for reviewing
const getForReview = async(token) =>{
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL + 'review', config)
    return response.data
}

// get reservation for checking
const getForCheck = async(token) =>{
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL + 'check', config)
    return response.data
}

//update reservation
const updateReserve = async(resID) => {
    const response = await axios.put(API_URL + resID)
    
    return response.data
}

//delete reservation
const deleteReserve = async(reserveId, token) =>{
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.delete(API_URL + reserveId, config)
    return response.data
}

const reserveService = {
    createReserve,
    getReserves,
    deleteReserve,
    getAllReserves,
    getReservation,
    getForReview,
    getForCheck,
    updateReserve,
}

export default reserveService
