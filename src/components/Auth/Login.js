import './Login.scss'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { postLogin } from '../../services/apiService';
import { set } from 'lodash';
import { useDispatch } from 'react-redux';
import { doLogin } from '../../redux/action/userAction';
import { ImSpinner9 } from "react-icons/im";
const Login = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };
    const handleLogin = async () => {
        //validate
        if (!validateEmail(email)) {
            toast.error('Please enter a valid email');
            return;
        }
        if (!password) {
            toast.error('Please enter your password');
            return;
        }
        setIsLoading(true);
        let data = await postLogin(email, password);

        if (data && data.EC === 0) {
            dispatch(doLogin(data));
            toast.success(data.EM);
            setIsLoading(false);
            navigate('/');
        }

        if (data && data.EC !== 0) {
            toast.error(data.EM);
            setIsLoading(false);
        }
    }
    return (
        <div className="login-container">
            <div className='header'>
                <span>Don't have an account?</span>
                <button className='btn-signup' onClick={() => navigate('/register')}>Sign up</button>
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
                        onClick={() => handleLogin()}
                        disabled={isLoading}
                    >
                        {isLoading && <ImSpinner9 className='loader-icon' />}
                        <span>Log in</span>
                    </button>
                </div>
                <div className='back text-center'>
                    <span onClick={() => navigate('/')}>&#60;&#60; Go to HomePage</span>
                </div>
            </div>
        </div >
    );
}
export default Login;