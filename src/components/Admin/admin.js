import SideBar from './SideBar';
import './admin.scss';
import { FaBars } from 'react-icons/fa';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import PerfectScrollbar from 'react-perfect-scrollbar'
import NavDropdown from 'react-bootstrap/NavDropdown';
import Language from '../Header/Language';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { doLogout } from '../../redux/action/userAction';
import { logout } from '../../services/apiService';
const Admin = (props) => {
    const [collapsed, setCollapsed] = useState(false);
    const account = useSelector(state => state.user.account);
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const handleLogOut = async () => {
        let res = await logout(account.email, account.refresh_token)
        if (res && res.EC === 0) {
            dispatch(doLogout());
            navigate('/login');
            toast.success(res.EM)

        } else {
            toast.error(res.EM)
        }
    }
    return (
        <div className="admin-container">
            <div className="admin-sidebar">
                <SideBar collapsed={collapsed} />
            </div>
            <div className="admin-content">
                <div className="admin-header">
                    <span className='leftside' onClick={() => setCollapsed(!collapsed)}>
                        <FaBars className="btn-toggle" />

                    </span>
                    <div className='rightside'>
                        <Language />
                        <NavDropdown title="Settings" id="basic-nav-dropdown">
                            <NavDropdown.Item >Profile</NavDropdown.Item>
                            <NavDropdown.Item onClick={() => handleLogOut()}>Log Out</NavDropdown.Item>
                        </NavDropdown>
                    </div>

                </div>
                <div className="admin-main">
                    <PerfectScrollbar>
                        <Outlet />
                    </PerfectScrollbar>

                </div>

            </div>
        </div>
    );
}

export default Admin;