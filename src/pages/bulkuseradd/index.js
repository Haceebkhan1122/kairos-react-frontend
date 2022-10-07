import React from 'react';
import { useState } from 'react';
import './style.scss';
import {DatePicker, Table, Modal} from 'antd';
import { BackArrowCircled} from '../../assets/icons';
import { EmplooyeInput } from '../../components/layout';

const   BulkUserAdd = ()=>{
    const BulkAddUserData=[
        {
            key:1,
            DcdUserID:'ProjA',
            FirstName:'aamob1',
            LastName:'A',
            Email:'info@kairossolutions.co',
            Status:'Present',
            Phone:'',
            Country:'AUSTRALIA',
            Address:'',
        },
        {
            key:2,
            DcdUserID:'kairos',
            FirstName:'Driver',
            LastName:'R',
            Email:'info@kairossolutions.co',
            Status:'Present',
            Phone:'',
            Country:'AUSTRALIA',
            Address:'',
        },
        {
            key:2,
            DcdUserID:'kairos',
            FirstName:'Driver',
            LastName:'R',
            Email:'info@kairossolutions.co',
            Status:'Present',
            Phone:'',
            Country:'AUSTRALIA',
            Address:'',
        },
        {
            key:2,
            DcdUserID:'kairos',
            FirstName:'Driver',
            LastName:'R',
            Email:'info@kairossolutions.co',
            Status:'Present',
            Phone:'',
            Country:'AUSTRALIA',
            Address:'',
        },
    ];
    const BulkAddUserColumns=[
        {
            title:<input type='checkbox'/>
        },
        {
            title:'DcdUserID',
            dataIndex:'DcdUserID'
        },
        {
            title:'FirstName',
            dataIndex:'FirstName'
        },
        {
            title:'LastName',
            dataIndex:'LastName'
        },
        {
            title:'Email',
            dataIndex:'Email'
        },
        {
            title:'Status',
            dataIndex:'Status'
        },
        {
            title:'Phone',
            dataIndex:'Phone'
        },
        {
            title:'Country',
            dataIndex:'Country'
        },
        {
            title:'Address',
            dataIndex:'Address'
        },
    ];

return(
        <>
            <div class="timeEntryMain" style={{padding:'32px 100px'}}>
                <div className="row mx-auto timeEntrySection py-2">
                    <div className="col-12 p-0">
                        <div>
                            <div className="row mx-auto border-bottom px-2">
                                <div className="col-xl-12 col-md-2 p-0 d-flex justify-content-between my-2">
                                    <span className="headingText">Bulk User Add</span>
                                    <span>
                                        <button className="addAllBtn">Add All</button>
                                    </span>
                                </div>
                            </div>
                            <div className="col-12 d-flex mx-auto align-items-center mt-2 px-4">
                                <div className="w-100">
                                    <Table
                                        columns={BulkAddUserColumns}
                                        dataSource={BulkAddUserData}
                                        className="bulkUserAddTbl"
                                        bordered={true}
                                    >    
                                    </Table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>           
    </>
    )
}

export default BulkUserAdd;