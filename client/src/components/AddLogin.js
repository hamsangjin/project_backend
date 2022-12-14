import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {useHistory} from 'react-router-dom'

const AddLogin = () => {
    const [adduserId, setAdduserId] = useState("")
    const [addpassword, setAddpassword] = useState("")
    const [addpwCh, setAddpwCh] = useState("")
    const [addName, setAddName] = useState("")
    const [addBirthDate, setAddBirthDate] = useState("")
    const [addEmail, setAddEmail] = useState("")
    const [addPhoneNum, setAddPhoneNum] = useState("")
    const [addMajor, setAddMajor] = useState("")
    const [addSex, setAddSex] = useState("")
    const [usableID, setUsableID] = useState(false)

    const history = useHistory();

    function handleAdduserId(e) {
        e.preventDefault();
        setAdduserId(e.target.value);
    };
    function handleAddpassword(e) {
        e.preventDefault();
        setAddpassword(e.target.value);
    }
    function handleAddpwCh(e) {
        e.preventDefault();
        setAddpwCh(e.target.value);
    }
    function handleAddName(e) {
        e.preventDefault();
        setAddName(e.target.value);
    }
    function handleAddBirthDate(e) {
        e.preventDefault();
        setAddBirthDate(e.target.value);
    }
    function handleAddEmail(e) {
        e.preventDefault();
        setAddEmail(e.target.value);
    }
    function handleAddPhoneNum(e) {
        e.preventDefault();
        setAddPhoneNum(e.target.value);
    }
    function handleAddMajor(e) {
        e.preventDefault();
        setAddMajor(e.target.value);
    }
    function handleAddSex(e) {
        e.preventDefault();
        setAddSex(e.target.value);
    }

    function userIdCheck(e) {
        
        e.preventDefault();
        fetch("http://localhost:5000/api/login/userId")
            .then((res) => (res.json()))
            .then((data) => {
                console.log(data)
                if(adduserId===""){
                    alert("???????????? ???????????????")
                }else{
                console.log(data.length);
                for (var i = 0; i < data.length; i++) {
                    if (data[i].userId === adduserId) {
                        console.log(adduserId, data[i].userId)
                        alert("???????????? ??????????????????.")
                        setUsableID(false);
                        break;
                    }else{
                        if(i===data.length-1){
                            alert("??????????????? ??????????????????.")
                            setUsableID(true);
                        }                 
                    }               
                }}           
            })
    }
    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (usableID === true) {
            if (addpassword !== addpwCh) {
                return alert('??????????????? ???????????? ????????? ????????????.')
            } else {
                const userData = {
                    userId: adduserId,
                    password: addpassword,
                    name: addName,
                    birthDate: addBirthDate,
                    email: addEmail,
                    phoneNum: addPhoneNum,
                    major: addMajor,
                    sex: addSex
                };
                axios.post("http://localhost:5000/api/login", userData)
                    .then((res) => {
                        // ????????? ??????????????? ??????????????????
                        if(res.status===200){
                            // ?????? ?????? ???????????? ????????? ????????? ??????
                            alert("????????? ?????????????????????.")
                            history.push('/login')
                        }
                    })
            }
        } else if(usableID === false) {
            alert("????????? ?????????????????????")
        }
    }



    return (
        <div className='loginMain'>
            <form onSubmit={handleFormSubmit}>
                <h1>?????? ??????</h1>
                ?????????: <input type='text' name='inputuserId' value={adduserId} onChange={handleAdduserId}></input>{"  "}
                <Button onClick={userIdCheck}>????????????</Button><br />
                ????????????: <input type="password" name='inputpassword' value={addpassword} onChange={handleAddpassword}></input><br />
                ???????????? ??????: <input type="password" name='inputpwCh' value={addpwCh} onChange={handleAddpwCh}></input><br />
                ??????: <input type='name' name='inputName' value={addName} onChange={handleAddName}></input><br /><br />
                ????????????: <input type='BirthDate' name='inputBirthDate' value={addBirthDate} onChange={handleAddBirthDate}></input><br /><br />
                ?????????: <input type='text' name='inputEmail' value={addEmail} onChange={handleAddEmail}></input><br /><br />
                ????????????: <input type='text' name='inputPhoneNum' value={addPhoneNum} onChange={handleAddPhoneNum}></input><br /><br />
                ??????: <input type='text' name='inputMajor' value={addMajor} onChange={handleAddMajor}></input><br /><br />
                {/* ??? ?????? ??????????????? ? ????????? ???????????? ?????? ???????????? */}
                ??????: <input type='text' name='inputSex' value={addSex} onChange={handleAddSex}></input><br /><br />
                <Button type='submit'>??????</Button> {'  '}
                <Link to='/login'>
                    <Button>????????????</Button>
                </Link>
            </form>

        </div>
    )
}

export default AddLogin