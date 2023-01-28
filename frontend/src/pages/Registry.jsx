import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { register } from '../features/auth/authSlice'
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

    }, [user, isError, isSuccess, message, navigate, dispatch])

    const SEAITE = ["PICE", "IIEE", "LITES", "UAPSA", "JIEEP", "LTL", "SSC", "CCA", "LUSC" ]
    const SABH = ["HOST", "JFINEX", "JPIA", "JMAH", "LTL", "SSC", "CCA", "LUSC" ]
    const SEAS = ["LIFE", "JAPS", "PSS", "CRIM", "LTL", "SSC", "CCA", "LUSC" ]
    const SHAS = ["LPSO", "LNSO", "LMTO", "LTL", "SSC", "CCA", "LUSC" ]

    let underDept = null
    let orgs = null

    const onChange = (e) =>{
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    if (dept === 'SEAITE') {underDept = SEAITE}
    else if (dept === 'SABH') { underDept = SABH }
    else if (dept === 'SEAS') { underDept = SEAS }
    else if (dept === 'SHAS') { underDept = SHAS }

    if(underDept){ orgs = underDept.map((e) => <option key={e}>{e}</option>) }

    const onSubmit = () =>{

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

        setFormData({
            name: '',
            idnum: '',
            password: '',
            cpassword: '',
            role: '',
            org: '',
            dept: '',
        })
        navigate(-1)
    }

    return (
      <div class='ehe'>
        <div class='reg-form-container'>
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
                        <option>Dean of the OSAS</option>
                        <option>OSAS Staff</option>
                        <option>Outdoor Stage In-Charge</option>
                        <option>Department Dean</option>
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
                            <option hidden>- - - - -</option>
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
                        <option hidden>- - - - -</option>
                        {orgs}
                    </select>
                    </div>
                </div>

                <div className ='reg-button' id='form-buttons'>
                  <button type='submit'>Register</button>
                </div>
            </div>
            </form>
        </div>
    </div>
    );
}

export default Registry