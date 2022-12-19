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

// // create temporary values
// const setTemp = async(tempData, token) =>{
//     const config = {
//         headers: {
//             Authorization: `Bearer ${token}`
//         }
//     }
//     const response = await axios.post(API_URL + 'temp', tempData, config)

//     if(response.data) {
//         localStorage.setItem('temporary', JSON.stringify(response.data))
//     }

//     return response.data
// }

// // get user reservations
// const getTemp = async(token) =>{
//     const config = {
//         headers: {
//             Authorization: `Bearer ${token}`
//         }
//     }
//     const response = await axios.get(API_URL + 'temp', config)
//     return response.data
// }

// //delete reservation
// const deleteTemp = async(tempId, token) =>{
//     const config = {
//         headers: {
//             Authorization: `Bearer ${token}`
//         }
//     }
//     const response = await axios.delete(API_URL + 'temp/' + tempId, config)
//     return response.data
// }

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
const getReservesDash = async(token) =>{
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL + 'limited', config)
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
const getForReviewDash = async(token) =>{
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL + 'reviewLimited', config)
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
const getForCheckDash = async(token) =>{
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL + 'checkLimited', config)
    return response.data
}

// get reservation for checking (deans)
const getForDean = async(token) =>{
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL + 'deans', config)
    return response.data
}
const getForDeanDash = async(token) =>{
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL + 'deansLimited', config)
    return response.data
}

//update reservation
const updateReserve = async(updateData) => {
    const response = await axios.put(API_URL + updateData.resID, updateData)
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
    setTemp,
    getTemp,
    deleteTemp,
    getReserves,
    getReservesDash,
    deleteReserve,
    getAllReserves,
    getReservation,
    getForReview,
    getForReviewDash,
    getForCheck,
    getForCheckDash,
    getForDean,
    getForDeanDash,
    updateReserve,
}

export default reserveService
