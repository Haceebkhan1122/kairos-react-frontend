import React from 'react';
import { useState } from 'react';
import './style.scss';
import {DatePicker, Table, Modal} from 'antd';
import { BackArrowCircled} from '../../assets/icons';
import { EmplooyeInput } from '../../components/layout';

const   AddBulkUsers = ()=>{
return(
        <>
            <div class="timeEntryMain p-2">
                <div className="row mx-auto timeEntrySection py-2">
                    <div className="col-12 p-0">
                        <div>
                            <div className="row mx-auto border-bottom px-2">
                                <div className="col-xl-6 col-md-2 p-0 d-flex justify-content-md-start">
                                    <span>
                                        
                                    </span>
                                    <span className="headingText">Add Bulk Users</span>
                                </div>
                            </div>
                            <div className="row d-flex mx-auto align-items-center mt-2 px-2">
                                <div className="col-lg-5 col-sm-6">
                                    <div className="row d-flex align-items-center">
                                        <span className="col-sm-4 col-6 statusTxt text-end">Upload File:</span>
                                        <span className="col-sm-8 col-6 d-flex justify-content-start align-items-center">
                                        <button className="fileBtn d-flex align-items-center justify-content-center ">Choose File</button>
                                        <span className="mx-1 statusTxt  ">No File Choosen</span>
                                        </span>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-sm-6 mt-sm-0 mt-2">
                                    <button className="uploadExcelBtn">Upload Excel File</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
                        
    </>
    )
}

export default AddBulkUsers;