import { BrowserRouter, Routes, Route } from 'react-router-dom';
import User from './components/User/user';
import Admin from './components/Admin/admin';
import HomePage from './components/Home/HomePage';
import Dashbroad from './components/Admin/Content/DashBoard';
import ManageUser from './components/Admin/Content/ManageUser';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import App from './App';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ListQuiz from './components/User/ListQuiz';
import DetailQuiz from './components/User/DetailQuiz';
import ManageQuiz from './components/Admin/Content/Quix/ManageQuiz';
import Questions from './components/Admin/Content/Question/Questions';

const NotFound = () => {
    return <div className='alert alert-danger container mt-3'>404 Not Found data with current URL</div>;
}
const Layout = (props) => {
    return (
        <>
            <Routes>
                <Route path="/" element={<App />} >
                    <Route index element={<HomePage />} />
                    <Route path="users" element={<ListQuiz />} />
                </Route>

                <Route path="/quiz/:id" element={<DetailQuiz />} />

                <Route path="/admins" element={<Admin />} >
                    <Route index element={<Dashbroad />} />
                    <Route path="manage-user" element={<ManageUser />} />
                    <Route path="manage-quizzes" element={<ManageQuiz />} />
                    <Route path="manage-questions" element={<Questions />} />
                </Route>

                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="*" element={<NotFound />} />
            </Routes>

            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </>
    )
}
export default Layout;