import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { register, reset } from '../features/auth/authSlice'
import '../assets/scss/registry.scss'

function Registry() {
    const [formData, setFormData] = useState({
        name: '',
        idnum: '',
        password: '',
        cpassword: '',
        role: '',
        org: '',
        dept: '',
    })
    const { name, idnum, password, cpassword, role, org, dept } = formData
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {user, isError, isSuccess, message} = useSelector((state) => state.auth)

    useEffect(() =>{
        if(isError){
            toast.error(message)
        }
        if(!user){
            return navigate('/login')
        }
        if(isSuccess){
            toast.info('User Registered')
            navigate('/admin/dashboard')
        }
        return () =>{
            dispatch(reset());
        }

    }, [user, isError, isSuccess, message, navigate, dispatch])

    const onChange = (e) =>{
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const onSubmit = (e) =>{
        e.preventDefault()

        if(password !== cpassword){
            toast.error('Password do no match')
        } else {
            const userData = {
                name,
                idnum,
                password,
                role,
                org,
                dept,
            }
            dispatch(register(userData))
        }
    }

    return (
      <div class='ehe'>
        <div class='form-container'>
            <form onSubmit={onSubmit}>
            <div class='form-title'><h1>USER REGISTRATION</h1></div>

            <div class='form-fields'>
                <div>
                    <label>Name</label>
                    <input
                    type='text'
                    className='form-control'
                    id='name'
                    name='name'
                    value={name}
                    placeholder='Enter Name'
                    onChange={onChange} />
                </div>
                <div>
                    <label>ID Number</label>
                    <input
                    type='text'
                    className='form-control'
                    id='idnum'
                    name='idnum'
                    value={idnum}
                    placeholder='Enter ID Number'
                    onChange={onChange} />
                </div>
                <div>
                    <label>Password</label>
                    <input
                    type='password'
                    className='form-control'
                    id='password'
                    name='password'
                    value={password}
                    placeholder='Enter Password'
                    onChange={onChange} />
                </div>
                <div>
                    <label>Confirm Password</label>
                    <input
                    type='password'
                    className='form-control'
                    id='cpassword'
                    name='cpassword'
                    value={cpassword}
                    placeholder='Confirm Password'
                    onChange={onChange} />
                </div>
                <div>
                    <label>Role</label>
                    <select type='text'
                    className='form-control'
                    id='role'
                    name='role'
                    value={role}
                    placeholder='Select Role'
                    onChange={onChange}>
                        <option>- - - - -</option>
                        <option>Student Officer</option>
                        <option>Faculty</option>
                        <option>Approving Admin</option>
                    </select>
                </div>

                <div class='small-fields'>
                    <div>
                    <label>Department</label>
                        <select type='text'
                        className='form-control'
                        id='dept'
                        name='dept'
                        value={dept}
                        placeholder='Select Department'
                        onChange={onChange}>
                            <option>- - - - -</option>
                            <option>SEAITE</option>
                            <option>SABH</option>
                            <option>SHAS</option>
                            <option>SEAS</option>
                        </select>
                    </div>

                    <div>
                    <label>Organization</label>
                    <select type='text'
                    className='form-control'
                    id='org'
                    name='org'
                    value={org}
                    placeholder='Select Organization'
                    onChange={onChange}>
                        <option>- - - - -</option>
                        <option>LITES</option>
                        <option>JPIA</option>
                        <option>LMTS</option>
                        <option>LIFE</option>
                    </select>
                    </div>
                </div>

                <div class='buttons' id='form-buttons'>
                  <button type='submit' className='btn btn-block'>Register</button>
                </div>
            </div>
            </form>
        </div>
    </div>
    );
}

export default Registry