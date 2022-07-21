import React, { useState, useEffect } from "react";
import {useNavigate} from "react-router-dom";

export const EditUser =({Name, setName})=>{

    console.log(Name);
    let nav = useNavigate();

    const [userDetail, setUserDetail] = useState({
        firstName: Name.firstname,
        lastName: Name.lastname,
        userName: Name.username,
        emailId: Name.emailId,
        oldPassword: "",
        newPassword: "",
        confirmPassword:""
    })
        const handleInput = (e) => {

        const id = e.target.id;
        const value = e.target.value.trim();

        setUserDetail({...userDetail, [id]:value }) //dynamic data
    }

    const handleSubmit = async(e) =>{
        e.preventDefault();

        const newUser ={...userDetail }

        var response = await fetch(`http://localhost:8000/users/${Name._id}`, {
        method: "PUT",
        headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({
                "username": newUser.userName,
                "firstname": newUser.firstName,
                "lastname": newUser.lastName,
                "oldPassword": newUser.oldPassword,
                "newPassword": newUser.newPassword,
                "password_confirm": newUser.confirmPassword,
                "emailId": newUser.emailId
            })
        })
        console.log(response);

        var resdata = await response.json();
        console.log(resdata);

        if(response.status===400){
            document.querySelector('#fn').innerHTML = resdata.msg;
            document.querySelector('#fn').style.display = 'block';
            setTimeout(function(){
                document.querySelector('#fn').style.display = 'none'
            },3000);  
        }
        if(response.status===200){
            console.log("status 200 ", resdata.oldUser);
            setName(resdata.oldUser);
            document.querySelector('#fn').innerHTML = "edited successfully";
            document.querySelector('#fn').className="text-success";
            nav("/myprofile");
        }

    }
    
    return (
        
    
        <div className=" card p-5 mx-5  my-5 text-muted ">

            <form action="" onSubmit={handleSubmit}>
                <div>
                    <h1 className="text-center">Edit your profile</h1>
                    <p className="p-3">Change only those fields which you want to edit</p>
                </div>

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
                    <label htmlFor="oldPassword">Old Password</label>
                    <input className=" form-control col-md-8 text-dark" type="password"  id="oldPassword" value={userDetail.oldPassword} 
                    onChange={handleInput} autoComplete="off" ></input>
                </div>
                
                <div>
                    <label htmlFor="newPassword">New Password</label>
                    <input className=" form-control col-md-8 text-dark" type="password"  id="newPassword" value={userDetail.newPassword} 
                    onChange={handleInput} autoComplete="off" ></input>
                </div>

                <div>
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input className=" form-control col-md-8 text-dark" type="password"  id="confirmPassword" value={userDetail.confirmPassword} 
                    onChange={handleInput} autoComplete="off" ></input>
                </div>

                <label htmlFor="fn" id="fn" className="text-danger"></label> {/*error message displayed here */}
                
                <button  type="submit" className="btn btn-dark text-light my-3" onClick={handleSubmit} >Submit</button> 
                

            </form>

        </div>
    )
   
}