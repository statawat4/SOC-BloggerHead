import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const Home =({ jwt_token, setDisp, setBlogId, setPage })=>{
    let noOfCharac = 300;
  const nav = useNavigate();
  const [blogs, setBlogs] = useState(null);

    function readMore(e) {
        setBlogId(e.target.id);
        setPage(3);
        nav("/blog");
      }
    
      useEffect(() => {
        const fetchData = async() =>{
            
                const res = await fetch("http://localhost:8000/blogs");
                var resdata = await res.json();
                setBlogs(resdata);
            
        };
        fetchData();
    
        //document.querySelector('#fn').innerHTML="No Blogs available! Please try after some time.";
      }, []);

    return (
        <div >

            <div id="carouselExampleIndicators" className="carousel slide bg-dark p-5 my-5" data-ride="carousel">
                <ol className="carousel-indicators">
                    <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="3"></li>
                </ol>
                <div className="carousel-inner my-3 ">
                    <div className="carousel-item active">
                        <h1 className="text-light p-5  mx-auto text-center ">
                            Welcome to the Blogger<span className="text-info">Head</span> Website!
                        </h1>
                    </div>
                    <div className="carousel-item ">
                        <h1 className="text-light p-5  mx-auto text-center ">
                            where you can read various blogs that interests you,
                        </h1>
                    </div>
                    <div className="carousel-item">
                        <h1 className="text-light p-5  mx-auto text-center ">
                            create and post you own blogs and let others read...
                        </h1>
                    </div>
                    <div className="carousel-item">
                        <h2 className="text-light p-5  mx-auto text-center ">
                            ENJOY BLOGGING :{")"}
                        </h2>
                    </div>
                </div>
                <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="sr-only">Previous</span>
                </a>
                <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="sr-only">Next</span>
                </a>
            </div>

            {jwt_token === null && <div>
                <h3>To read the blogs , <Link to ="/login" >Login</Link> first</h3>    
            </div>}

            {jwt_token != null && <div className="p-3" >

            {blogs && <ul id="blogs" className="p-1 bg-secondary ">
            {blogs.slice(0, 2).map((blog, i) => {
              let bool = blog.content.length < noOfCharac;
              let displayText = bool
                ? blog.content
                : `${blog.content.slice(0, noOfCharac)} ...`;
              return (
                <li className="list-group-item mx-2 " key={i}>
                  <div className="card card-body my-1">
                    <h4 style={{ textAlign: "center" }}>{blog.title}</h4>
                    <p>{displayText}</p>
                    <h6 style={{ textAlign: "right" }}>Author: {blog.author}</h6>
                    {!bool && (
                      <button
                        onClick={readMore}
                        id={blog._id}
                        className="btn btn-primary btn-sm float-right"
                      >
                        Read More
                      </button>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>}
                <Link to ="/blogs" ><button type="submit" onClick={()=>setDisp(10)} className="btn bg-light text-dark my-3 mx-5">see more such blogs</button></Link>
            </div>}
            

        </div>
    )
}