import axios from 'axios'

const API_URL = '/api/users/'

// register user
const register = async (userData) => {
    const response = await axios.post(API_URL, userData)

    if(response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}

// get all users
const getUsers = async(token) =>{
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL + 'all', config)
    return response.data
}

// get user
const getMe = async(token) =>{
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL + 'me', config)
    return response.data
}

// login user
const login = async (userData) => {
    const response = await axios.post(API_URL + 'login', userData)

    if(response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}

// logout user
const logout = () =>{
    localStorage.removeItem('user')
}

const authService = {
    register,
    login,
    logout,
    getUsers,
    getMe
}

export default authService
