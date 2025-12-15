import ModalCreateUser from "./ModalCreateUser";
import { FcPlus } from "react-icons/fc";
import TableUser from "./TableUser"
import { useEffect, useState } from "react";
import { getAllUsers, getUserWithPaginate } from "../../../services/apiService";
import ModalUpdateUser from "./ModalUpdateUser";
import ModalViewUser from "./ModalViewUser";
import ModalDeleteUser from "./ModalDeleteUser";
import TableUserPaginate from "./TableUserPaginate";

const ManageUser = (props) => {
    const LIMIT_USER = 5

    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    const [showModalCreateUser, setShowModalCreateUser] = useState(false);
    const [listUsers, setListUsers] = useState([]);

    const [showModalUpdateUser, setShowModalUpdateUser] = useState(false);
    const [dataUpdateUser, setDataUpdateUser] = useState({});

    const [showModalViewUser, setShowModalViewUser] = useState(false);
    const [dataViewUser, setDataViewUser] = useState({})

    const [dataDeleteUser, setDataDeleteUser] = useState({})
    const [showModalDeleteUser, setShowModalDeleteUser] = useState(false);
    const fetchAllUsers = async () => {
        let res = await getAllUsers();
        if (res && res.EC === 0) {
            setListUsers(res.DT);
        }
    }

    const fetchListUsersWithpaginate = async (page) => {
        let res = await getUserWithPaginate(page, LIMIT_USER);
        if (res && res.EC === 0) {
            console.log('check res paginate', res.DT);
            setListUsers(res.DT.users);
            setPageCount(res.DT.totalPages);
        }
    }

    const handleClickBtnUpdate = (user) => {
        setShowModalUpdateUser(true);
        setDataUpdateUser(user);
    }

    const resetUpdateData = () => {
        setDataUpdateUser({})
    }

    const resetViewData = () => {
        setDataViewUser({})
    }

    const handleClickBtnView = (user) => {
        setShowModalViewUser(true);
        setDataViewUser(user);
    }

    const handleClickBtnDelete = (user) => {
        setShowModalDeleteUser(true);
        setDataDeleteUser(user);
    }

    useEffect(() => {
        // fetchAllUsers();
        fetchListUsersWithpaginate(1);

    }, []);


    return (
        <div className="manage-user-container">
            <div className="title">
                ManageUser
            </div>

            <div className="user-content">
                <div className="btn-add-new">
                    <button className="btn btn-primary" onClick={() => setShowModalCreateUser(true)}>
                        <FcPlus /> Add new users
                    </button>
                </div>
                <div className="table-users-container">
                    {/* <TableUser listUsers={listUsers}
                        handleClickBtnUpdate={handleClickBtnUpdate}
                        handleClickBtnView={handleClickBtnView}
                        handleClickBtnDelete={handleClickBtnDelete}

                    /> */}
                    <TableUserPaginate listUsers={listUsers}
                        handleClickBtnUpdate={handleClickBtnUpdate}
                        handleClickBtnView={handleClickBtnView}
                        handleClickBtnDelete={handleClickBtnDelete}
                        fetchListUsersWithpaginate={fetchListUsersWithpaginate}
                        pageCount={pageCount}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                    />
                </div>
                <ModalCreateUser
                    show={showModalCreateUser}
                    setShow={setShowModalCreateUser}
                    fetchAllUsers={fetchAllUsers}
                    fetchListUsersWithpaginate={fetchListUsersWithpaginate}
                    pageCount={pageCount}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
                <ModalUpdateUser
                    show={showModalUpdateUser}
                    setShow={setShowModalUpdateUser}
                    dataUpdateUser={dataUpdateUser}
                    fetchAllUsers={fetchAllUsers}
                    resetUpdateData={resetUpdateData}
                    fetchListUsersWithpaginate={fetchListUsersWithpaginate}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
                <ModalViewUser
                    show={showModalViewUser}
                    setShow={setShowModalViewUser}
                    dataViewUser={dataViewUser}
                    resetViewData={resetViewData}
                />

                <ModalDeleteUser
                    show={showModalDeleteUser}
                    setShow={setShowModalDeleteUser}
                    dataDeleteUser={dataDeleteUser}
                    fetchAllUsers={fetchAllUsers}
                    fetchListUsersWithpaginate={fetchListUsersWithpaginate}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}

                />

            </div>
        </div>
    );
}

export default ManageUser;