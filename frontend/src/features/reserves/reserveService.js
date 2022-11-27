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

// get all reservations
// const getAllReserves = async(token) =>{
//     const config = {
//         headers: {
//             Authorization: `Bearer ${token}`
//         }
//     }
//     const response = await axios.get(API_URL + 'all', config)
//     return response.data
// }

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
}

export default reserveService
