import React from 'react';
import { useState } from 'react';
import './style.scss';
import {DatePicker, Table, Modal,Input,message} from 'antd';
import { BackArrowCircled} from '../../assets/icons';
import { EmplooyeInput } from '../../components/layout';
import {MyInputSecondary, Logo} from "../../components/shared";
import {Form} from "reactstrap";

const   EmailSetup = ()=>{
return(
        <>
            <div class="timeEntryMain">
                <div className="row mx-auto timeEntrySection py-2">
                    <div className="col-12 p-0">
                        <div>
                            <div className="row mx-auto border-bottom px-2">
                                <div className="col-xl-6 col-md-2 p-0 d-flex justify-content-md-start">
                                    <span>
                                        
                                    </span>
                                    <span className="headingText">Email Setup</span>
                                </div>
                            </div>
                            <div className="row d-flex mx-auto align-items-center mt-2 px-2">
                                <div className="col-lg-12 col-sm-6">
                                    <div style={{width:'90%',margin:'auto'}} className="emailSetupForm">
                                        




                                    <Form
                                        className="d-flex"
                                        /*onSubmit={formSubmitHandler}*/
                                    >
                                        <div className="inputContainer">
                                            <MyInputSecondary

                                                // first={emailFirst}
                                                // margin={'0 0 0 0'}
                                                width={'100%'}
                                                height={'20px'}
                                                fontSize={'12px'}
                                                padding={'2px 4px'}
                                                backgroundColor={'#ffffff !important'}
                                                // opacity={'0.6'}
                                                labelHide={false}
                                                radius={'4px'}
                                                for={'SMTP Server'}
                                                name={'SMTP Server'}
                                                label='SMTP Server:'
                                                type={'text'}
                                                labelFontSize={'13px'}
                                                labelFontWeight={'400'}
                                                labelMargin={'0 0 1px 0'}
                                                // onError={emailError}
                                                // onChange={emailChangeHandler}
                                                placeholder={'Server'}
                                            />
                                        </div>
                                        <div className="inputContainer">
                                            <MyInputSecondary

                                                // first={emailFirst}
                                                // margin={'0 0 0 0'}
                                                width={'100%'}
                                                height={'20px'}
                                                fontSize={'12px'}
                                                padding={'2px 4px'}
                                                backgroundColor={'#ffffff !important'}
                                                // opacity={'0.6'}
                                                labelHide={false}
                                                radius={'4px'}
                                                for={'Port'}
                                                name={'port:'}
                                                label='Port:'
                                                type={'text'}
                                                labelFontSize={'13px'}
                                                labelFontWeight={'400'}
                                                labelMargin={'0 0 1px 0'}
                                                // onError={emailError}
                                                // onChange={emailChangeHandler}
                                                placeholder={'Port'}
                                            />
                                        </div>
                                        <div className="inputContainer">
                                            <MyInputSecondary

                                                // first={emailFirst}
                                                // margin={'0 0 0 0'}
                                                width={'100%'}
                                                height={'20px'}
                                                fontSize={'12px'}
                                                padding={'2px 4px'}
                                                backgroundColor={'#ffffff !important'}
                                                // opacity={'0.6'}
                                                labelHide={false}
                                                radius={'4px'}
                                                for={'Email'}
                                                name={'email'}
                                                label='Email:'
                                                type={'email'}
                                                labelFontSize={'13px'}
                                                labelFontWeight={'400'}
                                                labelMargin={'0 0 1px 0'}
                                                // onError={emailError}
                                                // onChange={emailChangeHandler}
                                                placeholder={'Email'}
                                            />
                                            </div>
                                            <div className="inputContainer">
                                                <label style={{}}>Secure Port:</label>
                                                <div>
                                                    <input
                                                        type='checkbox'
                                                    />
                                                    <span>Secure</span>
                                                </div> 
                                        </div>
                                        <div className="inputContainer">
                                            <MyInputSecondary

                                                // first={emailFirst}
                                                // margin={'0 0 0 0'}
                                                width={'100%'}
                                                height={'20px'}
                                                fontSize={'12px'}
                                                padding={'2px 4px'}
                                                backgroundColor={'#ffffff !important'}
                                                // opacity={'0.6'}
                                                labelHide={false}
                                                radius={'4px'}
                                                for={'Password'}
                                                name={'password'}
                                                label='Password:'
                                                type={'password'}
                                                labelFontSize={'13px'}
                                                labelFontWeight={'400'}
                                                labelMargin={'0 0 1px 0'}
                                                // onError={emailError}
                                                // onChange={emailChangeHandler}
                                                placeholder={'*******'}
                                            />
                                        </div>
                                        <div className="inputContainer">
                                            <MyInputSecondary

                                                // first={emailFirst}
                                                // margin={'0 0 0 0'}
                                                width={'100%'}
                                                height={'20px'}
                                                fontSize={'12px'}
                                                padding={'2px 4px'}
                                                backgroundColor={'#ffffff !important'}
                                                // opacity={'0.6'}
                                                labelHide={false}
                                                radius={'4px'}
                                                for={'Address From'}
                                                name={'addressFrom'}
                                                label='Address From:'
                                                type={'text'}
                                                labelFontSize={'13px'}
                                                labelFontWeight={'400'}
                                                labelMargin={'0 0 1px 0'}
                                                // onError={emailError}
                                                // onChange={emailChangeHandler}
                                                placeholder={'Address From'}
                                            />
                                        </div>
                            {/* <div className="checkbox-inline mb-2">
                                <label className="checkbox checkbox-outline text-white m-0">
                                    <input type="checkbox" name="remember_me" className="me-2"/>
                                    <span className="checkboxText">Remember me</span>
                                </label>
                            </div> */}
                            <div className="text-center">
                                <button type='submit' className="myBtn">
                                    Sign In
                                </button>
                            </div>
                        </Form>





                                    </div>
                                    <div className="d-flex align-items-center">
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

export default EmailSetup;