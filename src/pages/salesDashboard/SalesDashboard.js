import React, { useEffect, useState } from 'react';
import HelpCenterIcon from '@mui/icons-material/HelpCenter';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../../redux/features/SalesDashboardSlice'
import axios from 'axios';
import { Link } from 'react-router-dom';

const SalesDashboard = () => {
    const post = useSelector((state) => state.post);
    const myTableData = post.posts.data
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false)
    const [searchTitle, setSearchTitle] = useState("");
    const [searchContact, setSearchContact] = useState("");


    useEffect(() => {
        dispatch(getPosts())
    }, [dispatch])

    return (
        <>

            <div className='container-fluid'>
                <div className='main_wrapper_hk'>
                    <div className='row'>
                        <div className='col-md-6'>
                            <div className='page_head_top'>
                                <h2>Sale Dashboard</h2>
                            </div>
                        </div>
                        <div className='col-md-6'>
                            <div className='page_head_top'>
                                <div className='row show_ent justify-content-end '>
                                    <div className='col-md-4'>
                                        <div className="d-flex justify-content-end mb-3">
                                            <label className="col-form-label">Entires: </label>
                                            <div className="within_field">
                                                <select className="form-select" aria-label="Default select example">
                                                    <option value="10" selected>10</option>
                                                    <option value="20">20</option>
                                                    <option value="25">25</option>
                                                    <option value="50">50</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-md-5'>
                                        <div className="d-flex justify-content-end mb-3">
                                            <label className="col-form-label">Search: </label>
                                            <div className="within_field">
                                                <input type="email" class="form-control" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="wrapper">
                            <div className='col-md-12'>
                                <div className='searching'>
                                    <input type="text" class="form-control" placeholder='Search by Address...'
                                        onChange={(e) => setSearchTitle(e.target.value)} />
                                    <input type="text" class="form-control" placeholder='Search by Contact No...' onChange={(e) => setSearchContact(e.target.value)} />
                                    {/* <button type="submit" class="btn btn-primary">Search</button> */}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='row mt-4'>
                        <div className='col-md-12'>
                            <table class="table table-bordered table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col">Address</th>
                                        <th scope="col">Info</th>
                                        <th scope="col">Associated Contact No</th>
                                        <th scope="col">Customer</th>
                                        <th scope="col">Last Order</th>
                                        <th scope="col">Pending Order</th>
                                        <th scope="col">Total Orders Amount</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {myTableData && myTableData.filter((value) => {
                                        if (searchTitle) {
                                            if (searchTitle === "") {
                                                return value;
                                            } else if (value.Address.toString().toLowerCase().includes(searchTitle.toLowerCase())) {
                                                return value
                                            }
                                        }
                                        else {
                                            if (searchContact === "") {
                                                return value;
                                            } else if (value.AssociatedContact) {
                                                console.log(value.AssociatedContact)
                                                return value
                                            }
                                        }

                                    }).map((element) => {
                                        return (
                                            <tr key={element.Address}>
                                                <td>{element.Address ? element.Address : "-"}</td>
                                                <td><Link to="/salesorder/addtocart"><HelpCenterIcon />{element.Info}</Link></td>
                                                <td className='text-center'>{element.AssociatedContact ? element.AssociatedContact : "-"}</td>
                                                <td>{element.Customer}</td>
                                                <td>{element.DateOfLastOrder}</td>
                                                <td>{element.PendingOrder}</td>
                                                <td>{element.Remarks}</td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                            <div className='pagination_hk d-flex justify-content-center mt-4'>
                                <nav aria-label="...">
                                    <ul class="pagination">
                                        <li class="page-item disabled">
                                            <a class="page-link" href="#" tabindex="-1" aria-disabled="true"><ArrowBackIosIcon /></a>
                                        </li>
                                        <li class="page-item"><a class="page-link" href="#">1</a></li>
                                        <li class="page-item active" aria-current="page">
                                            <a class="page-link" href="#">2</a>
                                        </li>
                                        <li class="page-item"><a class="page-link" href="#">3</a></li>
                                        <li class="page-item">
                                            <a class="page-link" href="#"><ArrowForwardIosIcon /></a>
                                        </li>
                                    </ul>
                                </nav>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SalesDashboard