import React, { useState } from "react";
import {useNavigate} from "react-router-dom";

export const Signup =()=>{

    const nav = useNavigate();

    const [userDetail, setUserDetail] = useState({
        firstName: "",
        lastName: "",
        userName: "",
        emailId: "",
        password: "",
        confirmPassword: ""
    })

    const handleInput = (e) => {

        const id = e.target.id;
        const value = e.target.value.trim();

        setUserDetail({...userDetail, [id]:value }) //dynamic data
    }

    const handleSubmit = async(e) =>{
        e.preventDefault();

        const newUser ={...userDetail, id : new Date().getTime().toString() }

        var response = await fetch("http://localhost:8000/users/signup", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({
                "username": newUser.userName,
                "firstname": newUser.firstName,
                "lastname": newUser.lastName,
                "password": newUser.password,
                "password_confirm": newUser.confirmPassword,
                "emailId": newUser.emailId
            })
        })
        console.log(response);

        var resdata = await response.json();
        // console.log(resdata.msg);

        if(response.status===400){
            document.querySelector('#fn').innerHTML = resdata.msg;
            document.querySelector('#fn').style.display = 'block';
            setTimeout(function(){
                document.querySelector('#fn').style.display = 'none'
            },3000);  
        }
        if(response.status===200){
            nav("/login");
        }

    }

    return (
        <div className=" card p-5 mx-5  my-5 text-muted ">

            <div className="text-center h1 text-info bg-light">Register yourself here</div>

            <form action="" onSubmit={handleSubmit}>

                <div >
                    <label htmlFor="firstName">First Name</label>
                    <input className=" form-control col-md-8 text-dark" type="text"  id="firstName" value={userDetail.firstName} 
                    onChange={handleInput} autoComplete="off" ></input>
                </div>
                
                <div>
                    <label htmlFor="lastName">Last Name</label>
                    <input className=" form-control col-md-8 text-dark" type="text"  id="lastName" value={userDetail.lastName} 
                    onChange={handleInput} autoComplete="off" ></input>
                </div>
                
                <div>
                    <label htmlFor="userName">Username</label>
                    <input className=" form-control col-md-8 text-dark" type="text"  id="userName" value={userDetail.userName} 
                    onChange={handleInput} autoComplete="off" ></input>
                </div>
                
                <div>
                    <label htmlFor="emailId">Email Id</label>
                    <input className=" form-control col-md-8 text-dark" type="email"  id="emailId" value={userDetail.emailId} 
                    onChange={handleInput} autoComplete="off" ></input>
                </div>
                
                <div>
                    <label htmlFor="password">Password</label>
                    <input className=" form-control col-md-8 text-dark" type="password"  id="password" value={userDetail.password} 
                    onChange={handleInput} autoComplete="off" ></input>
                </div>
                
                <div>
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input className=" form-control col-md-8 text-dark" type="password"  id="confirmPassword" value={userDetail.confirmPassword} 
                    onChange={handleInput} autoComplete="off" ></input>
                </div>

                <label htmlFor="fn" id="fn" className="text-danger"></label> {/*error message displayed here */}

                
                <button  type="submit" className="btn btn-dark text-light my-3">Submit</button> 
                

            </form>

        </div>
    )
}