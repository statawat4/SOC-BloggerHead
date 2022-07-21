import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

//show the userrs detail and also blogs he created and also give access to delete his profile and blogs

export const Myprofile = ({
  jwt_token,
  Name,
  setBlogId,
  setPage,
  disp,
  setDisp,
}) => {
  let noOfCharac = 300;
  const nav = useNavigate();
  const [len, setLen] = useState(0);
  const [blogs, setBlogs] = useState(null);

  function readMore(e) {
    setBlogId(e.target.id);
    setPage(2);
    nav("/blog");
  }

  function edit(e) {
    setBlogId(e.target.id);
    nav("/editblog");
  }

  function del(e) {
    setBlogId(e.target.id);
    nav("/delblog");
  }

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("http://localhost:8000/blogs");
      var resdata = await res.json();
      resdata = resdata.filter((blog) => {
        return blog.userId === Name._id;
      });
      setBlogs(resdata);
      setLen(resdata.length);
    };
    if (Name !== null) fetchData();
  }, [Name]);

  if (jwt_token != null) {
    return (
      <div className=" m-2">
        {jwt_token != null && (
          <div className="p-3 ">
            <div className="">
              <h1 className="text-center bg-light text-info ">
                My Profile
                <Link to="/deluser">
                  <button
                    type="button"
                    className="btn btn-md mx-1 my-1 btn-danger float-right"
                  >
                    Delete
                  </button>
                </Link>
                <Link to="/edituser">
                  <button
                    type="button"
                    className="btn btn-md mx-1 my-1 btn-success float-right"
                  >
                    Edit
                  </button>
                </Link>
              </h1>
            </div>

            <div className="bg-light">
              <h3 className="text-muted mx-3">
                {" "}
                Name :{" "}
                <span className="text-dark">
                  {Name.firstname} {Name.lastname}
                </span>
              </h3>
              <h3 className="text-muted mx-3">
                {" "}
                Username : <span className="text-dark">{Name.username}</span>
              </h3>
              <h3 className="text-muted mx-3">
                {" "}
                Email Id : <span className="text-dark">{Name.emailId}</span>
              </h3>
            </div>
            <div>
              <h1 className="text-center text-info">My Blogs</h1>

              {blogs && (
                <ul id="blogs" className="p-1 bg-secondary ">
                  {blogs.slice(disp - 10, disp).map((blog, i) => {
                    let bool = blog.content.length < noOfCharac;
                    let displayText = bool
                      ? blog.content
                      : `${blog.content.slice(0, noOfCharac)} ...`;
                    return (
                      <li className="list-group-item mx-2 " key={i}>
                        <div className="card card-body my-1">
                          <label id={blog._id} className="text-info pl-2">
                            <button
                              id={blog._id}
                              className="btn btn-success btn-sm float-right"
                              onClick={edit}
                            >
                              Edit
                            </button>
                            <button
                              id={blog._id}
                              className="btn btn-danger btn-sm float-right"
                              onClick={del}
                            >
                              Delete
                            </button>
                          </label>
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
              )}
              {len === 0 && (
                <div
                  id="fn"
                  className={`h3 p-2 text-center bg-${
                    len > 0 ? "success" : "danger"
                  } my-5`}
                >
                  {len > 0 ? "" : "No Blogs Created!"}
                </div>
              )}
            </div>
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
            {disp !== 10 && (
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
        )}
      </div>
    );
  } else {
    return (
      <div className="fn">
        <h1>phle login kariye</h1>
      </div>
    );
  }
};
