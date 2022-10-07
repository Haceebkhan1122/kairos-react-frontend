import React from 'react';
import {FormFeedback, FormGroup, Input, Label} from "reactstrap";
import './style.scss';

const MyInputSecondary = (props)=>{
    return (
        <>
            <FormGroup className="formGroupClasses">
                <Label
                    for={props.for}
                    className="text-dark" 
                    /*hidden={!!props.labelHide}*/
                    style={{
                        fontSize:props.labelFontSize,
                        fontWeight:props.labelFontWeight,
                        margin:props.labelMargin,
                    }}
                >
                    {props.label}
                    
                </Label>
                <Input
                    cssModule={{'outline': 'none'}}
                    style={{
                            border: '1px solid #C1C1C1',
                            borderRadius: props.radius ? props.radius : '5px',
                            backgroundColor:props.backgroundColor,
                            padding:props.padding,
                            fontSize:props.fontSize,
                            margin:props.margin,
                            width:props.width,
                            height:props.height,
                            // opacity:props.opcaity
                    }}
                       name={props.name}
                    //    onChange={props.onChange}
                    //    required={true}
                    //    valid={props.first ? null : !props.onError}
                    //    invalid={props.onError}
                       type={props.type}
                       placeholder={props.placeholder}
                    //    autoComplete='off'
                />
                <FormFeedback invalid={true}>
                    {props.error}
                </FormFeedback>
            </FormGroup>
        </>
    );
}
export default MyInputSecondary;