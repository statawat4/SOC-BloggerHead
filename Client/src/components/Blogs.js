import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const Blogs = ({ setBlogId, disp, setDisp, setPage }) => {
  let noOfCharac = 300;
  const nav = useNavigate();
  const [len, setLen] = useState(0);
  const [blogs, setBlogs] = useState(null);

  function readMore(e) {
    setBlogId(e.target.id);
    setPage(0);
    nav("/blog");
  }

  useEffect(() => {
    const fetchData = async() =>{
        
            const res = await fetch("http://localhost:8000/blogs");
            var resdata = await res.json();
            setBlogs(resdata);
            setLen(resdata.length)
        
    };
    fetchData();

    //document.querySelector('#fn').innerHTML="No Blogs available! Please try after some time.";
  }, []);
  return(
    <div>
      <div className="p-3  mx-3 my-3">
        <div className="h1 text-center ">
          Blogger<span className="text-info">Head</span>
        </div>
        {blogs && <div className="my-5 mx-5">
          <div id="fn" className="h3 p-2 text-center bg-light my-5"></div>

          <ul id="blogs" className="p-1 bg-secondary ">
            {blogs.slice(disp-10, disp).map((blog, i) => {
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
          </ul>
        </div>}
        {len > disp && (
          <button
            onClick={function () {
              setDisp(disp + 10);
            }}
            type="submit"
            className="btn bg-light text-dark my-3 mx-5"
          >
            More Blogs
          </button>
        )}
        {disp!==10 && (
          <button
            onClick={function () {
              setDisp(disp - 10);
            }}
            type="submit"
            className="btn bg-light text-dark my-3 mx-5"
          >
            Previous Page
          </button>
        )}
        <Link to="/">
          <span className="p-3 mx-3 ">Home Page</span>
        </Link>
      </div>
    </div>
  );
};
