import axios from "axios";
import ReactPaginate from 'react-paginate';


const TableUserPaginate = (props) => {
    const { listUsers, fetchListUsersWithpaginate, pageCount, currentPage } = props;
    const { handleClickBtnUpdate, handleClickBtnView, handleClickBtnDelete } = props;
    const handlePageClick = (event) => {
        fetchListUsersWithpaginate(+event.selected + 1);
        props.setCurrentPage(+event.selected + 1)

    };
    return (
        <>
            <table className="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th scope="col">No</th>
                        <th scope="col">Username</th>
                        <th scope="col">Email</th>
                        <th scope="col">Role</th>
                        <th scope="col">Action</th>

                    </tr>
                </thead>
                <tbody>
                    {listUsers && listUsers.length > 0 &&
                        listUsers.map((item, index) => {
                            return (
                                <tr key={`table-user-${index}`}>
                                    <th scope="row">{item.id}</th>
                                    <td>{item.username}</td>
                                    <td>{item.email}</td>
                                    <td>{item.role}</td>
                                    <td>
                                        <button className="btn btn-secondary"
                                            onClick={() => handleClickBtnView(item)}
                                        >View</button>
                                        <button className="btn btn-warning mx-3"
                                            onClick={() => handleClickBtnUpdate(item)}>
                                            Update
                                        </button>
                                        <button className="btn btn-danger"
                                            onClick={() => handleClickBtnDelete(item)}>Delete</button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                    {listUsers && listUsers.length === 0 && <tr>
                        <td colSpan={'4'}>Not Found data</td>
                    </tr>}
                </tbody>
            </table>
            <ReactPaginate
                previousLabel="< Pre"
                nextLabel="Next >"
                breakLabel="..."
                breakClassName="page-item"
                breakLinkClassName="page-link"
                pageCount={pageCount}
                pageRangeDisplayed={4}
                marginPagesDisplayed={2}
                onPageChange={handlePageClick}
                containerClassName="pagination justify-content-center"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                activeClassName="active"
                forcePage={props.currentPage - 1}
            />
        </>
    );
}

export default TableUserPaginate;