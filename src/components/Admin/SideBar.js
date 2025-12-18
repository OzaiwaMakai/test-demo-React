import 'react-pro-sidebar/dist/css/styles.css';
import {
    ProSidebar,
    Menu,
    MenuItem,
    SubMenu,
    SidebarHeader,
    SidebarFooter,
    SidebarContent,
} from 'react-pro-sidebar';
import { FaTachometerAlt, FaGem, FaList, FaGithub, FaRegLaughWink, FaHeart } from 'react-icons/fa';
import { RiArrowDropDownLine } from "react-icons/ri";
import sidebarBg from '../../assets/bg2.jpg';
import { DiReact } from "react-icons/di";
import { MdDashboard } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';

const SideBar = (props) => {
    const { image, collapsed, toggled, handleToggleSidebar } = props;
    const navigate = useNavigate();
    return (
        <div>
            <ProSidebar
                image={sidebarBg}
                collapsed={collapsed}
                toggled={toggled}
                breakPoint="md"
                onToggle={handleToggleSidebar}
            >
                <SidebarHeader>
                    <div
                        style={{
                            padding: '24px',
                            textTransform: 'uppercase',
                            fontWeight: 'bold',
                            fontSize: 14,
                            letterSpacing: '1px',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                        }}
                    >
                        <DiReact color={"#61DBFB"} size={"50px"} />
                        <span
                            onClick={() => navigate('/')}>
                            Hoi Dan IT</span>
                    </div>
                </SidebarHeader>

                <SidebarContent>
                    <Menu iconShape="circle">
                        <MenuItem
                            icon={<FaTachometerAlt />}
                            suffix={<span className="badge red">new</span>}
                        >
                            dashboard
                            <Link to="/admins" />
                        </MenuItem>
                        {/* <MenuItem icon={<FaGem />}> components</MenuItem> */}
                    </Menu>
                    <Menu icon={<FaGem />}>
                        <SubMenu
                            title="Features"
                            // suffix={<span className="badge yellow"></span>}
                            icon={<FaGem />}
                        >
                            <MenuItem>Quản lý Users
                                <Link to="manage-user" />
                            </MenuItem>
                            <MenuItem>
                                <Link to="manage-quizzes" />
                                Quản lý Bài Quizz
                            </MenuItem>
                            <MenuItem>
                                <Link to="manage-questions" />
                                Quản lý Câu Hỏi</MenuItem>
                        </SubMenu>
                    </Menu>
                </SidebarContent>

                <SidebarFooter style={{ textAlign: 'center' }}>
                    <div
                        className="sidebar-btn-wrapper"
                        style={{
                            padding: '20px 24px',
                        }}
                    >
                        <a
                            href="https://hoidanit.vn/"
                            target="_blank"
                            className="sidebar-btn"
                            rel="noopener noreferrer"
                        >
                            <span style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                                &#169; Hoi Dan IT
                            </span>
                        </a>
                    </div>
                </SidebarFooter>
            </ProSidebar>
        </div >
    );
}
export default SideBar;