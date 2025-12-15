import './Login.scss'
import { useState } from 'react';
const Login = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleLogin = () => {
        alert('login');
    }
    return (
        <div className="login-container">
            <div className='header'>
                Don't have an account?
            </div>
            <div className='title col-4 mx-auto'>
                Hoi dan IT
            </div>
            <div className='welcome col-4 mx-auto'>
                Hello, who's this?
            </div>
            <div className='content-form col-4 mx-auto'>
                <div className='form-group'>
                    <label>Email </label>
                    <input type={'email'} className='form-control' placeholder='Enter email address'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className='form-group'>
                    <label>Password </label>
                    <input type={'password'} className='form-control' placeholder='Enter password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} />
                </div>
                <span className='forgot-password'>Forgot your password?</span>
                <div>
                    <button className='btn-submit'
                        onClick={() => handleLogin()}>Log in</button>
                </div>
            </div>
        </div>
    );
}
export default Login;