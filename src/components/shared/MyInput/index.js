import React from 'react';
import {FormFeedback, FormGroup, Input, Label} from "reactstrap";
import './style.scss';

const MyInputField = (props)=>{
    return (
        <>
            <FormGroup>
                <Label for={props.for} className="text-white" hidden={!!props.labelHide}>
                    {props.label}
                </Label>
                <Input
                    style={{border: '0', borderRadius: props.radius ? props.radius : '10px',backgroundColor:props.backgroundColor,padding:props.padding,fontSize:props.fontSize,margin:props.margin,opacity:props.opcaity}}
                       name={props.name}
                       onChange={props.onChange}
                       required={true}
                       valid={props.first ? null : !props.onError}
                       invalid={props.onError}
                       type={props.type}
                       placeholder={props.placeholder}
                       autoComplete='off'/>
                <FormFeedback invalid={true}>
                    {props.error}
                </FormFeedback>
            </FormGroup>
        </>
    );
}
export default MyInputField;