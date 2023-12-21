import { useState } from "react"
import { registerUser, loginUser} from "../firebase"
import { useNavigate} from "react-router-dom"


export default function Login(){

    const [isLogginIn, setIsLogginIn] = useState(true)
    
    function handleClick(){
        setIsLogginIn(oldState => !oldState)
    }

    

    return (
        <div className="login-page page">
            <button onClick={handleClick}>login</button>
            {isLogginIn ? <LoginForm /> : <RegisterForm/>}
        </div>
    )
}

function RegisterForm(){
    const [ userInfo, setUserInfo ] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: '',
        accountType: '',
        photoUrl: '',
    })
    const [registerError, setRegisterError] = useState(null)

    const nav = useNavigate()

    function handleChange(event){
        return setUserInfo(oldInfo => ({
            ...oldInfo,
            [event.target.name]: event.target.value
        }))
    }

    function handleRadio(event){
        return setUserInfo(oldInfo => ({
            ...oldInfo,
            accountType: event.target.value
        }))
    }


    async function handleSubmit(){
        if(userInfo.password !== userInfo.confirmPassword){
            setRegisterError("Passwords do not match. Please try again.")
            return null
        }
        const res = await registerUser(userInfo)
        if(!res){
            setRegisterError(true)
        }
        else nav('/')
    }

    return (
        <>
            <h1>Register</h1>
            {registerError && <p>{registerError}</p>}
            <form>
                <input
                    name="email"
                    type="email"
                    value={userInfo.email}
                    placeholder="Email address"
                    onChange={handleChange}  
                />
                <input
                    name="password"
                    type="password"
                    placeholder="Password" 
                    value={userInfo.password}
                    onChange={handleChange}
                />
                <input
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm password" 
                    value={userInfo.confirmPasswordpassword}
                    onChange={handleChange}
                />
                <input
                    name="firstName"
                    type="text"
                    placeholder="First Name" 
                    value={userInfo.firstName}
                    onChange={handleChange}
                />
                <input
                    name="lastName"
                    type="text"
                    placeholder="Last Name" 
                    value={userInfo.lastName}
                    onChange={handleChange}
                />
                <input
                    type="radio"
                    name="accountType"
                    value="client"
                    onChange={handleRadio}
                /><label>Client</label>
                <input
                    type="radio"
                    name="accountType"
                    value="worker"
                    onChange={handleRadio}
                /><label>Worker</label>
                
            </form>
            <button onClick={handleSubmit}>Submit</button>
        </>
    )
}

function LoginForm(){
    const [ userInfo, setUserInfo ] = useState({
        email: '',
        password: '',
    })
    const [loginError, setLoginError] = useState(null)

    const nav = useNavigate()

    function handleChange(event){
        return setUserInfo(oldInfo => ({
            ...oldInfo,
            [event.target.name]: event.target.value
        }))
    }

    async function handleSubmit(){
        const res = await loginUser(userInfo.email, userInfo.password)
        if(!res){
            setLoginError("there has been an error ma boy!")
        }
        else nav('/')
    }

    return (
        <>
            <h1>Login</h1>
            {loginError && <p>{loginError}</p>}
            <form>
                <input
                    name="email"
                    type="email"
                    value={userInfo.email}
                    placeholder="Email address"
                    onChange={handleChange}  
                />
                <input
                    name="password"
                    type="password"
                    placeholder="Password" 
                    value={userInfo.password}
                    onChange={handleChange}
                />
            </form>
            <button onClick={handleSubmit}>Submit</button>
        </>
    )
}