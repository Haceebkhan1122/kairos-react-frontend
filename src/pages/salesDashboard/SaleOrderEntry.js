import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCustomers } from '../../redux/features/SalesOrderEntryCustomerSlice';
import { getParts } from '../../redux/features/SalesOrderPartSlice';
import { Link } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';

const SaleOrderEntry = () => {
    const customer = useSelector((state) => state.customer.getCustomers.part);
    const partData = useSelector((state) => state.part.getCustomers);
    console.log(partData, "partData")
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false);
    const [value, setValue] = useState()
    const [searchPart, setSearchPart] = useState("");



    useEffect(() => {
        dispatch(getCustomers())
        dispatch(getParts())
    }, [dispatch])

    const handleChange = event => {
        setValue(event.target.value);
    };


    return (
        <>

            <div className='container-fluid'>
                <div className='main_wrapper_hk sale_order_entry'>
                    <div className='row'>
                        <div className='col-md-4 mb-4'>
                            <div className='page_head_top'>
                                <h2>Quick Order</h2>
                            </div>
                        </div>
                        <div className='col-md-8'>
                            <div className='page_head_top'>
                                <div className='row show_ent justify-content-start'>
                                    <div className='col-md-6'>
                                        <div className="open_order_para">
                                            <p>Open Order : <b>100</b>  Amount : <b>36,355.07</b> Credit Limit : <b>70,000.00</b></p>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="buttons_checkout d-flex">
                                            <button type="submit" class="btn btn-primary">Customer History</button>
                                            <button type="submit" class="btn btn-primary">Proceed to Checkout</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="wrapper">
                            <div className='col-md-12'>
                                <div className='searching'>
                                    <div className='row'>
                                        <div className='col-md-4'>
                                            <div className='label'>
                                                <label for="exampleInputEmail1" class="form-label">Customer:</label>
                                            </div>
                                            <select className="form-select" aria-label="Default select example" onChange={handleChange} name="name" value={value}>
                                                {customer.map((option, index) => (
                                                    <option key={index} value={option.value}>
                                                        {option.Name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className='col-md-4'>
                                            <div className='label'>
                                                <label for="exampleInputEmail1" class="form-label">Search Part:</label>
                                            </div>
                                            <input type="text" class="form-control" onChange={(e) => setSearchPart(e.target.value)} />
                                        </div>
                                        <div className='col-md-4'>
                                            <div className='label'>
                                                <label for="exampleInputEmail1" class="form-label">Delivery Note:</label>
                                            </div>
                                            <input type="text" class="form-control" />
                                        </div>
                                        <div className='col-md-4 mt-2'>
                                            <div className='label'>
                                                <label for="exampleInputEmail1" class="form-label">PO Num:</label>
                                            </div>
                                            <input type="text" class="form-control" />
                                        </div>
                                        <div className='col-md-4 mt-2'>
                                            <div className='label'>
                                                <label for="exampleInputEmail1" class="form-label">Need By:</label>
                                            </div>
                                            <input type="date" class="form-control" />
                                        </div>
                                        <div className='col-md-4 mt-2'>
                                            <div className='label'>
                                                <label for="exampleInputEmail1" class="form-label">Auto invoice:</label>
                                            </div>
                                            <input class="styled-checkbox" id="styled-checkbox-2" type="checkbox" value="value2" />
                                            <label for="styled-checkbox-2"></label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <table class="table table-bordered table-hover mt-5">
                        <thead>
                            <tr>
                                <th scope="col">Actions</th>
                                <th scope="col">Part</th>
                                <th scope="col">Description	</th>
                                <th scope="col">Bin</th>
                                <th scope="col">UnitPrice</th>
                                <th scope="col">Qty</th>
                                <th scope="col">Discount Percent</th>
                                <th scope="col">Discount</th>
                                <th scope="col">Tax</th>
                                <th scope="col">Sub total</th>


                            </tr>
                        </thead>
                        <tbody>
                            {partData && partData.filter((value) => {
                                if (searchPart === "") {
                                    return value;
                                } else if (value.Part_PartNum.toString().toLowerCase().includes(searchPart.toLowerCase())) {
                                    return value
                                }
                            }).map((item) => {
                                return (
                                    <tr>
                                        <td><Link to="/"><DeleteIcon /></Link></td>
                                        <td>{item.Part_PartNum}</td>
                                        <td className='text-center'>{item.Part_PartDescription}</td>
                                        <td>{item.PartBin_BinNum}</td>
                                        <td>{item.Part_UnitPrice}</td>
                                        <td>
                                            <div className='types'>
                                                <input type="number" value="1" />
                                            </div>
                                        </td>
                                        <td>
                                            <div className='types'>
                                                <input type="number" value="1" />
                                            </div>
                                        </td>
                                        <td>0.00</td>
                                        <td>1.40</td>
                                        <td>15.40</td>
                                    </tr>
                                )
                            })}

                            <tr className='total_row'>
                                <td>Total</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>0.00</td>
                                <td>1.40</td>
                                <td>15.40</td>
                            </tr>

                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default SaleOrderEntry