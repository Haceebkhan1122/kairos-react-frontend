import React from 'react';
import axios from '../../axiosconfig/index';

const Employees = {
    getEmployees: () => {
        return new Promise((resolve, reject) => {
            console.log('getEmployees');
            let config = {
                method: 'get',
                url: '/api/mtimeentry/getemp',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('tokenMKairos'),
                }
            };
            axios(config)
                .then(function (response) {
                    resolve(response);
                })
                .catch(function (error) {
                    reject(error);
                });
        });
    },
    getEmployeesData:(date,employeeNum)=>{
        // console.log(date,employeeNum);
        return new Promise((resolve, reject) => {
            // date format should be YYYY-MM-DD
            let data = JSON.stringify({
                "date": date,
                "EmployeeNum": employeeNum
            });
            let config = {
                method: 'post',
                url: '/api/mtimeentry/getemployeedata',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('tokenMKairos'),
                    'Content-Type': 'application/json'
                },
                data : data
            };
        axios(config)
            .then(function (response) {
                resolve(response);
            })
            .catch(function (error) {
                reject(error);
            });
        });
    },
    getEmployeesEditProjects:()=>{
        // console.log(date,employeeNum);
        return new Promise((resolve, reject) => {
            let config = {
                method: 'post',
                url: '/api/mtimeentry/getprojects',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('tokenMKairos'),
                    // 'Cookie': 'connect.sid=s%3ASbbBKmGw6CrXj_raMYcAV-iDDr8LVMj6.Rz%2FOs%2FOAqk60nNGOZQKEZY68sQO1Fk6BlkySPTlq1gA'
                }
            };
            axios(config)
                .then(function (response) {
                    resolve(response);
                })
                .catch(function (error) {
                    reject(error);
                });
        });
    },
    getEmployeesEditPhase:(projectId)=>{
        // console.log(date,employeeNum);
        return new Promise((resolve, reject) => {
            let data = JSON.stringify({
                "prjctid": projectId
            });
            let config = {
                method: 'post',
                url: '/api/mtimeentry/getphase',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('tokenMKairos'),
                    'Content-Type': 'application/json',
                    // 'Cookie': 'connect.sid=s%3A_PS8t46YGXq3z3pGRrcD1C11EHki6gra.pRnnGKM9k7SRAWkqGxmZclKhWIx%2Ba6xAtt0gCbCOG%2BA; connect.sid=s%3ApQ4uh97OKSaAnEDO2sVcqF3-gy9-cqqN.T1RKmr3fJd1tmUUTstCyQEhbrCvcrM4mgqmTPscC1lE'
                },
                data : data
            };
            axios(config)
                .then(function (response) {
                    resolve(response);
                })
                .catch(function (error) {
                    reject(error);
                });
        });
    },
    getEmployeesEditOperations:(jobNum,resourceGroup,expCode,jcDept)=>{
        // console.log(date,employeeNum);
        return new Promise((resolve, reject) => {
            let data = JSON.stringify({
                "jobnum": jobNum,//"ProjALPHA-10",
                "resourcegroup": resourceGroup,//"",
                "expcode": expCode,//"DEF",
                "jcdept": jcDept,//"MAIN"
            });
            let config = {
                method: 'post',
                url: '/api/mtimeentry/getoperation',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('tokenMKairos'),
                    'Content-Type': 'application/json',
                    // 'Cookie': 'connect.sid=s%3AlcNZbc2NlUSyqxmeP8_oTkz6tPh9gJyB.mTVjOyWJD3BCc0PN3JGr0KGy1b8nYaxGvLX%2BDzfNm9c'
                },
                data : data
            };
            axios(config)
                .then(function (response) {
                    resolve(response);
                })
                .catch(function (error) {
                    reject(error);
                });
        });
    },
    getEmployeesEditAssembly:(jobNum)=>{
        // console.log(date,employeeNum);
        return new Promise((resolve, reject) => {
            let data = JSON.stringify({
                "jobnum": jobNum,//"ProjALPHA-10"
            });
            let config = {
                method: 'post',
                url: '/api/mtimeentry/getassembly',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('tokenMKairos'),
                    'Content-Type': 'application/json',
                    // 'Cookie': 'connect.sid=s%3AlcNZbc2NlUSyqxmeP8_oTkz6tPh9gJyB.mTVjOyWJD3BCc0PN3JGr0KGy1b8nYaxGvLX%2BDzfNm9c'
                },
                data : data
            };
            axios(config)
                .then(function (response) {
                    resolve(response);
                })
                .catch(function (error) {
                    reject(error);
                });
        });
    },
}
export default Employees;