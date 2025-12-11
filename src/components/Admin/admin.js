import SideBar from './SideBar';
import './admin.scss';
import { FaBars } from 'react-icons/fa';
import { useState } from 'react';

const Admin = (props) => {
    const [collapsed, setCollapsed] = useState(false);
    return (
        <div className="admin-container">
            <div className="admin-sidebar">
                <SideBar collapsed={collapsed} />
            </div>
            <div className="admin-content">
                <FaBars onClick={() => setCollapsed(!collapsed)} className="btn-toggle" />
                content
            </div>
        </div>
    );
}

export default Admin;