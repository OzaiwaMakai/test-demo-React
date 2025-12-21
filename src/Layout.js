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
import PrivateRoute from './routes/PrivateRoute';
import { Suspense } from 'react';
const NotFound = () => {
    return <div className='alert alert-danger container mt-3'>404 Not Found data with current URL</div>;
}

const Layout = (props) => {
    return (
        <Suspense fallback={<div>Loading...</div>}>

            <Routes>
                <Route path="/" element={<App />} >
                    <Route index element={<HomePage />} />

                    <Route path="users" element={
                        <PrivateRoute>
                            <ListQuiz />
                        </PrivateRoute>
                    } />
                </Route>

                <Route path="/quiz/:id" element={<DetailQuiz />} />

                <Route path="/admins" element={
                    <PrivateRoute>
                        <Admin /></PrivateRoute>} >
                    <Route index element={<Dashbroad />} />
                    <Route path="manage-user" element={<ManageUser />} />
                    <Route path="manage-quizzes" element={<ManageQuiz />} />
                    <Route path="manage-questions" element={<Questions />} />
                </Route>

                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/test" element={<PrivateRoute />} />
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
        </Suspense>
    )
}
export default Layout;