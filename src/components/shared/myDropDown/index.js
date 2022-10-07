import React, {useEffect} from 'react';
import { Select, Radio } from 'antd';
import {TimeEntryApi} from "../../../api";

const { Option } = Select;

const SetPlacementDemo = (props) => {
    useEffect(()=>{
        if(props.component === 'getProjects'){
            TimeEntryApi.getEmployeesEditProjects().then((res)=>{
                const list = [];
                res.data.project.map((project) => {
                    const l = {
                        value: project.ProjectID,
                        label: project.Description
                    };
                    list.push(l);
                });
                setOptions(list);
            }).catch((err)=>{
                console.log(err);
            })
        }
        else if(props.component === 'getPhase'){
            TimeEntryApi.getEmployeesEditPhase(props.projectId).then((res)=>{
                const list = [];
                res.data.map((phase) => {
                    const l = {
                        value: phase.PhaseID,
                        label: phase.PhaseID+'-'+phase.Description
                    };
                    list.push(l);
                });
                setOptions(list);
            }).catch((err)=>{
                console.log(err);
            })
        }
        else if(props.component === 'labourType'){
            setOptions(
                [{
                    value: 'p',
                    label: 'Project'
                },
                {
                    value: 'I',
                    label: 'Indirect'
                },
                {
                    value: 'PR',
                    label: 'Production'
                },]

                );
        }
    },[]);
    const [placement, SetPlacement] = React.useState('bottomLeft');
    const [options, setOptions] = React.useState([]);

    return (
        <>
            <Select
                defaultValue={props.defaultValue}
                style={{ width: 120 }}
                dropdownMatchSelectWidth={false}
                placement={placement}
                size={'small'}
            >
                {options.map((item, index) => {
                    return (<Option value={item.value}>
                        {item.label}
                    </Option>);
                })
                }
            </Select>
        </>
    );
};

export default SetPlacementDemo;