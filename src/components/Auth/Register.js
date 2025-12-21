import './Login.scss'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { postRegister } from '../../services/apiService';
import { FaEye } from "react-icons/fa";
import { IoMdEyeOff } from "react-icons/io";
import Language from '../Header/Language';

const Register = (props) => {

    const [type, setType] = useState('password');
    const [isShowPassword, setIsShowPassword] = useState(false);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const navigate = useNavigate();
    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const handleToggle = () => {
        if (type === 'password') {
            setIsShowPassword(true);
            setType('text')
        } else {
            setIsShowPassword(false)
            setType('password')
        }
    }

    const handleRegister = async () => {
        //validate
        if (!validateEmail(email)) {
            toast.error('Please enter a valid email');
            return;
        }
        if (!password) {
            toast.error('Please enter your password');
            return;
        }
        let data = await postRegister(email, password, username);

        if (data && data.EC === 0) {
            toast.success(data.EM);
            navigate('/login');
        }

        if (data && data.EC !== 0) {
            toast.error(data.EM);
        }
    }


    return (
        <div className="login-container">
            <div className='header'>
                <span>Already have an account?</span>
                <button className='btn-signup' onClick={() => navigate('/login')}>Sign in</button>
                <Language />
            </div>
            <div className='title col-4 mx-auto'>
                Hoi dan IT
            </div>
            <div className='welcome col-4 mx-auto'>
                Get your free account now!
            </div>
            <div className='content-form col-4 mx-auto'>
                <div className='form-group'>
                    <label>Email (*)</label>
                    <input type={'email'} className='form-control' placeholder='Enter email address'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)

                        }
                    />
                </div>
                <div className='form-group'>
                    <div><label>Password (*)</label>
                        <div className="d-flex mb-3">
                            <input
                                type={type}
                                name="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                autoComplete="current-password"
                                className='form-control'
                            />
                            <span className="icon-container" onClick={handleToggle}>
                                {isShowPassword ? <FaEye className="icon" size={25} /> : <IoMdEyeOff className="icon" size={25} />}
                            </span>
                        </div>
                    </div>

                </div>
                <div className='form-group'>
                    <label>Username </label>
                    <input type={'text'} className='form-control' placeholder='Enter username'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div>
                    <button className='btn-submit'
                        onClick={() => handleRegister()}>Register</button>
                </div>
            </div>
        </div>
    );
}
export default Register;