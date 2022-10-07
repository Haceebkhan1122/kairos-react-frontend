import React from 'react';
import { useState } from 'react';
import './style.scss';
import {DatePicker, Table, Modal} from 'antd';
import { BackArrowCircled} from '../../assets/icons';
import { EmplooyeInput } from '../../components/layout';

const MonthlySummary = ()=>{
    const [summaryModal,setSummaryModal]=useState(true);
const timeEntryColumn=[
    {
        title:'Employee',
    },
    {
        title:'Trans Month',
    },
    {
        title:'TRANS MONTH END',
    },
    {
        title:'PROJECT HOURS',
    },
    {
        title:'INDIRECT HOURS',
    },
    {
        title:'TOTAL HOURS',
    },
    {
        title:'PROD PERCENT',
    },
];

const timeEntriesColumn=[
    {
        title:'Clock in Date',
    },
    {
        title:'HRS',
    },
    {
        title:'LABOUR TYPE',
    },
    {
        title:'PROJECT ID',
    },
    {
        title:'PHASE ID',
    },
    {
        title:'INDIRECT CODE',
    },
    {
        title:'INDIRECT DESC',
    },
    {
        title:'LABOR NOTE',
    },
    {
        title:'PHASE DESCRIPTION',
        width:'30%',
    },
];


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
                                    <span className="headingText">Productivity Summary</span>
                                </div>
                                <div className="col-xl-6 col-md-10 p-0 d-flex justify-content-end">
                                    <button className="summaryBtn p-1">
                                        <span><BackArrowCircled/></span>
                                        <span className="summaryBtnTxt ps-2">Back</span>
                                    </button>
                                </div>
                            </div>
                            <div className="row d-flex mx-auto align-items-center mt-2 px-2">
                                <div className="col-lg-3 col-sm-6">
                                    <div className="row">
                                        <span className="col-sm-5 col-6 statusTxt">Employees:</span>
                                        <span className="col-sm-7 col-6">
                                        <EmplooyeInput/>
                                        </span>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-sm-6 mt-sm-0 mt-2">
                                    <div className="row">
                                        <span className="col-6 statusTxt text-sm-end text-start pe-0">Start Data:</span>
                                        <span className="col-6 text-start">
                                        <DatePicker
                                                allowClear={false}
                                                // bordered={false}
                                                // suffixIcon={null}
                                                size='small'
                                                style={{width:120,height:24,borderRadius:'5px !important',boxShadow:'none !important',overflow:'hidden !important'}}
                                                className="inputRounded border border-dark timeEntryInputs timeEntryClass bg-white text-start"
                                                // format={'DD-MM-YYYY'}
                                                // defaultValue={'20-10-2020'}
                                                // defaultValue={moment(moment(record?.Calculated_DueDate).format("YYYY-MM-D"), 'YYYY-MM-DD')}
                                            />
                                        </span>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-sm-6 mt-sm-0 mt-2">
                                    <div className="row">
                                        <span className="col-6 statusTxt text-sm-end text-start pe-0">End Data:</span>
                                        <span className="col-6 text-start">
                                        <DatePicker
                                                allowClear={false}
                                                // bordered={false}
                                                // suffixIcon={null}
                                                size='small'
                                                style={{width:120,height:24,borderRadius:'5px !important',boxShadow:'none !important',overflow:'hidden !important'}}
                                                className="inputRounded border border-dark timeEntryInputs timeEntryClass bg-white text-start"
                                                // format={'DD-MM-YYYY'}
                                                // defaultValue={'20-10-2020'}
                                                // defaultValue={moment(moment(record?.Calculated_DueDate).format("YYYY-MM-D"), 'YYYY-MM-DD')}
                                            />
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 p-0 px-2 mt-1 timeEntryTableSection">
                    <Table
                        columns={timeEntryColumn}
                        bordered={false}
                        locale={{emptyText:"No data here"}}
                        pagination={{
                            showTotal:(total) => `Total ${total} items`,
                            total:10,
                            pageSizeOptions: ["10","20", "25", "30"],
                            showSizeChanger: true,
                            locale: {emptyText:"No data Avaliable"}
                          }}
                    />
                    </div>
                </div>
                <div className="row mx-auto timeEntrySection py-2 mt-2">
                    <div className="col-12 p-0">
                        <div>
                            <div className="row mx-auto border-bottom px-2">
                                <div className="col-xl-6 col-md-2 p-0 d-flex justify-content-md-start">
                                    <span>
                                        
                                    </span>
                                    <span className="headingText">Time Entries</span>
                                </div>

                            </div>
                            <div className="row d-flex mx-auto align-items-center mt-2 px-2">
                                <div className="col-lg-12 col-sm-12 text-end">
                                    <button className="excelBtn">Excel</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 p-0 px-2 mt-1 timeEntryTableSection">
                    <Table
                        columns={timeEntriesColumn}
                        bordered={false}
                        pagination={{
                            showTotal:(total) => `Total ${total} items`,
                            total:10,
                            pageSizeOptions: ["10","20", "25", "30"],
                            showSizeChanger: true,
                          }}
                    />
                    </div>
                </div>
            </div>
            <Modal
                width='400px'
                // title="PO Details"
                visible={summaryModal}
                closable={false}
                
                cancelText='Close'
                // closableButtonProps={{style:{backgroundColor:'red'}}}
                className="mx-auto py-3 rounded-3 text-center"
                okText='OK'
                onOk={()=>{setSummaryModal(false)}}
                onCancel={()=>{setSummaryModal(false)}}
                okButtonProps={{ style: { fontSize: '13px',backgroundColor:'#3085d6',margin:'4px',padding:'10px 25px',display:'flex',alignItems:'center',justifyContent:'center',borderRadius:'5px'}}}
                cancelButtonProps={{ style: {display:'none'}}}
            >
                <div className="summaryModalMain">
                    <span className="summaryModalTxt">
                        Query with 'OAL_TimeEntryEmpSum' id is not found in '10GAL' company
                    </span>
                </div>
            </Modal>            
    </>
    )
}

export default MonthlySummary;