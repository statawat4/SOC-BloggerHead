import React, { useState, useEffect } from "react";
import {Link, useNavigate} from "react-router-dom";

export const EditBlog =({jwt_token, BlogId, setBlogId})=>{
    const [myblog, setMyblog] = useState({
        title: "",
        content: "",
        author: ""
    })
    
    let nav =  useNavigate();

    useEffect(() => {
        const fetchData = async() =>{
            
                const res = await fetch(`http://localhost:8000/blogs/${BlogId}`);
                var resdata = await res.json();
                setMyblog(resdata);
            
        };
        fetchData();
        
      }, []);

    const handleInput = (e) => {

        const id = e.target.id;
        var value = e.target.value

        setMyblog({...myblog, [id]:value }) //dynamic data
    }

    const handleSubmit = async(e) =>{
        e.preventDefault();

        const blogg ={...myblog }
        
        var response = await fetch(`http://localhost:8000/blogs/${BlogId}`, {
        method: "PUT",
        headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({
                "title": blogg.title.trim(),
                "content": blogg.content.trim(),
                "author": blogg.author.trim(),
            })
        })

        var resdata = await response.json();

        if(response.status===400){
            document.querySelector('#fn').innerHTML = resdata.msg;
            document.querySelector('#fn').style.display = 'block';
            setTimeout(function(){
                document.querySelector('#fn').style.display = 'none'
            },3000);  
        }
        if(response.status===200){
            document.querySelector('#fn').innerHTML = "Successsfully edited";
            document.querySelector('#fn').className="text-success";
            setBlogId("")
           
            nav("/myprofile");
        }

    }

    return (
        <div className="p-5">
            <div className="  p-2 mx-3 ">
                <h1>
                    <span className="text-info">Edit your blog</span> 
                </h1>
            </div>
            {jwt_token==null && <div>
                 to create your blog , <Link to="/login">Login</Link> first    
            </div>}
            {jwt_token!=null && <form onSubmit={handleSubmit}>

                <label htmlFor="fn" id="fn" className="text-danger"></label> {/*error message displayed here */}

                <div>
                    <label htmlFor="title">Title</label>
                    <input className=" form-control col-md-8 text-dark" type="text"  id="title" value={myblog.title} 
                    onChange={handleInput} autoComplete="off" ></input>
                </div>

                <div>
                    <label htmlFor="content">Description</label>
                    <textarea className=" form-control text-dark " rows="5" style={{resize:"none"}} type="text"  id="content" value={myblog.content} 
                    onChange={handleInput} autoComplete="off" ></textarea>
                </div>

                <div >
                    <label htmlFor="author">Name of the Author</label>
                    <input className=" form-control col-md-8 text-dark" type="text"  id="author" value={myblog.author} 
                    onChange={handleInput} autoComplete="off" ></input>
                </div>
                
                <button  type="submit" className="btn btn-dark text-light my-3" onClick={handleSubmit} >Submit</button> 
                

            </form>}
        </div>
    )
}