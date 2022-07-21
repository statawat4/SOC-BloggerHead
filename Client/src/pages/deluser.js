import React,{useState} from "react";
import { Link, useNavigate} from "react-router-dom";



export const DelUser = ({ Name, setName, setToken }) => {

    const nav = useNavigate();
    var [user, setUser] = useState("")

    const handleInput = (e) => {

        var value = e.target.value.trim();

        setUser(user=value) //dynamic data
    }

    const deleteUser = async() => {
        await fetch(`http://localhost:8000/users/${Name._id}`, {
        method: "DELETE"
        })
    }

    const handleSubmit = async(e) =>{
        e.preventDefault();

        var response = await fetch("http://localhost:8000/users/signin", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({
                "username": Name.username,
                "password": user
            })
        })
        console.log(response.status);

        var resdata = await response.json();
        //console.log(resdata, resdata.User , resdata.User.firstname , "Here");

        if(response.status===200){
            deleteUser();
            setToken(null);
            setName(null);
            localStorage.removeItem("token");
            localStorage.removeItem("User")
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
            {Name && <div className="container row shadow my-5">
                <div className="col-md-5 d-flex flex-column  form">
                    <p className="display-4 fw-bolder text-danger my-5"> Are you sure you want to <b>delete</b> your Account?</p>
                    
                </div>
                <div className="col-md-6 p-5">
                    <h1 className="display-6 fw-bolder mb-5">Delete</h1>
                    <p className="lead text-center mt-3">Enter Your Password To Delete your account and Press Confirm</p>
                    <form action=""  >
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label text-muted">Password</label>
                            <input type="password" className="form-control" id="password" value={user.password} onChange={handleInput} autoComplete="off"/>
                        </div>
                        <div className="mb-3 form-check">
                            {/* <input type="checkbox" className="form-check-input text-muted" id="exampleCheck1" autoComplete="off" /> */}
                            <label className="form-label text-danger" id="fn" htmlFor="fn"></label>
                        </div>
                        <button type="submit" onClick={ handleSubmit} className="btn btn-danger btn-sm float-right">Confirm</button>
                    </form>
                    <button onClick={ ()=>{nav('/myprofile')} } className="btn btn-success btn-sm float-right">Cancel</button>
                </div>
             </div>}
             {
                Name===null && <div className="text-center shadow p-5 my-5 mx-5">
                    <div className="h1 text-center ">
                    To explore first <Link to ="/login" >Login</Link>.
                    </div>
                </div>
             }
        </div>
    )
}