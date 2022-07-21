import React,{useState} from "react";
import {Link , useNavigate} from "react-router-dom";



export const Login = ({ setToken ,setName}) => {

    const nav = useNavigate();

    const [user, setUser] = useState({
        username: "",
        password: ""
    })

    const handleInput = (e) => {

        const id = e.target.id;
        const value = e.target.value.trim();

        setUser({...user, [id]:value }) //dynamic data
    }

    const handleSubmit = async(e) =>{
        e.preventDefault();

        const newUser ={...user }   

        var response = await fetch("http://localhost:8000/users/signin", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({
                "username": newUser.username,
                "password": newUser.password
            })
        })
        console.log(response.status);

        var resdata = await response.json();
        //console.log(resdata, resdata.User , resdata.User.firstname , "Here");

        if(response.status===200){
            setToken(resdata.jwt_token)
            localStorage.setItem("token", resdata.jwt_token)
            setName(resdata.User)
            localStorage.setItem("User", JSON.stringify(resdata.User))
            nav("/");
        }

        if(response.status===400){
            console.log("mee")
            document.querySelector('#fn').innerHTML = resdata.msg;
            console.log(resdata.msg)
            document.querySelector('#fn').style.display = 'block';
            setTimeout(function(){
                document.querySelector('#fn').style.display = 'none'
            },3000);  
        }

    }

    return (
        <div>
            <div className="container shadow my-5">
                <div className="row">
                    <div className="col-md-5 d-flex flex-column align-items-center form">
                        <h1 className="display-4 fw-bolder my-5"> Welcome Back!</h1>
                        <p className="lead text-center mt-3">Enter Your Credentials To Login</p>
                        <h5 className="mb-4">OR</h5>
                        <Link to="/signup" className="btn btn-outline-dark rounded-pill pb-2 w-50 ">SignUp</Link>
                    </div>
                    <div className="col-md-6 p-5">
                        <h1 className="display-6 fw-bolder mb-5">Login</h1>
                        <form action="" onSubmit={ handleSubmit} >
                            <div className="mb-3">
                                <label htmlFor="username" className="form-label text-muted">Username</label>
                                <input type="text" className="form-control" id="username" value={user.username} onChange={handleInput} autoComplete="off"/>
                                {/* <div id="emailHelp" className="form-text text-info">We'll never share your email with anyone else.</div> */}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label text-muted">Password</label>
                                <input type="password" className="form-control" id="password" value={user.password} onChange={handleInput} autoComplete="off"/>
                            </div>
                            <div className="mb-3 form-check">
                                {/* <input type="checkbox" className="form-check-input text-muted" id="exampleCheck1" autoComplete="off" /> */}
                                <label className="form-label text-danger" id="fn" htmlFor="fn"></label>
                            </div>
                            <button type="submit" className="btn btn-primary bg-dark text-light">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}