import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { LoadingAnimation } from '../components/Loading';
import { UserData } from '../context/UserContext';
import { FaEye, FaEyeSlash } from 'react-icons/fa';


function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const { loginUser, btnLoading } = UserData();
    const navigate = useNavigate();
    const submitHandler = (e) => {
        e.preventDefault();
        loginUser(email, password, navigate);
    }
    return (
        <div className='min-h-screen p-4 flex items-center justify-center bg-gray-100'>
            <div className='bg-white p-8 rounded-lg shadow-lg max-w-md w-full'>
                <div className='flex justify-center mb-4'>
                    <img className='h-12' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJjSZcYEnndhn9RvjJusPNh1Ccyusvl77M4A&s" alt="Pinterest" />
                </div>
                <h2 className='text-2xl font-semibold text-center mb-6'>Log in to see more</h2>
                <form onSubmit={submitHandler} action="">
                    <div className='mb-4'>
                        <label htmlFor="email" className='block text-sm font-medium text-gray-700'>Email</label>
                        <input required value={email} onChange={(e) => setEmail(e.target.value)} type="email" id='email' className='common-input' />
                    </div>
                    <div className='mb-4 relative'>
                        <label htmlFor="password" className='block text-sm font-medium text-gray-700'>Password</label>
                        <input required value={password} type={showPassword ? 'text' : 'password'} id='password' onChange={(e) => setPassword(e.target.value)} className='common-input' />
                        <div
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute top-9 right-3 cursor-pointer text-gray-500"
                            aria-label={showPassword ? 'Hide Password' : 'Show Password'}
                        >
                            {showPassword ? <FaEye /> : <FaEyeSlash />}
                        </div>
                    </div>
                    <button type='submit' className='common-btn' disabled={btnLoading}>{btnLoading ? <LoadingAnimation /> : "Log in"}</button>
                </form>
                <div className="mt-6 text-center">
                    <div className="relative mb-4">
                        <div className='absolute inset-0 flex items-center'>
                            <div className='w-full border-t border-gray-300'></div>
                        </div>
                        <div className="relative flex justify-center text-sm"><span className='bg-white px-2 text-gray-500'>OR</span></div>
                    </div>
                    <div className="mt-4 text-center text-sm">
                        <span>
                            Not on Pinterest yet? <Link className='font-medium text-pinterst hover:underline' to="/register">Register</Link>
                        </span>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Login
