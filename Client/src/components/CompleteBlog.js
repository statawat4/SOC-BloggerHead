import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const CompleteBlog = ({ BlogId, page}) => {
  const [blogData, setBlogData] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8000/blogs/${BlogId}`)
      .then((res) => res.json())
      .then((resdata) => setBlogData(resdata));
  }, [BlogId]);

  

  return blogData === null ? (
    <div />
  ) : (
    <div className="p-3  mx-3 my-3">
      <div className="h1 text-center ">
        Blogger<span className="text-info">Head</span>
      </div>
      <div className="my-5 mx-5">
        <div id="fn" className="h3 p-2 text-center bg-light my-5"></div>
        <ul id="blogs" className="p-1 bg-secondary ">
          <li className="list-group-item mx-2">
            <div className="card card-body my-1">
              <h2 style={{ textAlign: "center" }}>{blogData.title}</h2>
              <h5 style={{ textAlign: "right" }}>Author: {blogData.author}</h5>
              <p>{blogData.content}</p>
              <em>Last updated at: {blogData.updatedAt}</em>
            </div>
          </li>
        </ul>
      </div>
      {page===0 && <Link to="/blogs">
        <span className="p-3 mx-3 ">Go back</span>
      </Link>}
      {page===1 && <Link to="/search">
        <span className="p-3 mx-3 ">Go back</span>
      </Link>}
      {page===2 && <Link to="/myprofile">
        <span className="p-3 mx-3 ">Go back</span>
      </Link>}
      {page===3 && <Link to="/">
        <span className="p-3 mx-3 ">Go back</span>
      </Link>}
    </div>
  );
};
