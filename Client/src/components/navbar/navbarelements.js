import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export const Navbarelements = ({
  jwt_token,
  setToken,
  Name,
  setName,
  word,
  setWord,
  page,
  setDisp,
}) => {
  var [val, setVal] = useState("");
  let nav = useNavigate();

  const handleInput = (e) => {
    const value = e.target.value.trim();
    setVal((val = value));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!val) return;
    setDisp(10);
    setWord((word = val));
    console.log(word);
    nav("/search");
  };

  return (
    <div className="sticky-top">
      <div className="bg-dark text-light">
        <nav className="navbar sticky-top navbar-light p-2 ">
          <div
            className="btn-group float-start "
            role="group"
            aria-label="btn2"
          >
            <Link to="/about">
              <p className="nav-link text-light  mx-1">About</p>
            </Link>
            {jwt_token == null && (
              <Link to="/">
                <p className="nav-link text-light  mx-1">Read</p>
              </Link>
            )}
            {jwt_token && (
              <Link to="/blogs" onClick={() => setDisp(10)}>
                <p className="nav-link text-light  mx-1">Read</p>
              </Link>
            )}
            {jwt_token == null && (
              <Link to="/login">
                <p className="nav-link text-light mx-1">Create</p>
              </Link>
            )}
            {jwt_token != null && (
              <Link to="/create">
                {/* {console.log(jwt_token)} */}
                <p className="nav-link text-light mx-1">Create</p>
              </Link>
            )}
          </div>
          <Link to="/">
            <span className="navbar-brand text-light mb-0 h1">
              Blogger<span className="text-info">Head</span>
            </span>
          </Link>

          <div className="btn-group" role="group" aria-label="Btn1">
            {jwt_token == null && (
              <Link to="/login">
                <button
                  type="button"
                  className="btn btn-sm btn-link float-end text-light bg-info mx-1"
                >
                  login
                </button>
              </Link>
            )}
            {jwt_token != null && (
              <Link to="/">
                <button
                  onClick={function () {
                    setToken(null);
                    localStorage.removeItem("token");
                    localStorage.removeItem("User")
                  }}
                  type="button"
                  className="btn btn-sm btn-link float-end text-light bg-info mx-1"
                >
                  logout
                </button>
              </Link>
            )}
            {jwt_token == null && (
              <Link to="/signup">
                <button
                  type="button"
                  className="btn btn-sm btn-link float-end text-light bg-info"
                >
                  signup
                </button>
              </Link>
            )}
          </div>
        </nav>
      </div>

      {jwt_token != null && (
        <div className=" bg-light">
          <nav className="navbar sticky-top navbar-light p-2 ">
            <form className=" rounded col-lg-5">
              <input
                type="text"
                id="sbox"
                className="rounded"
                value={val}
                onChange={handleInput}
              />
              <button
                className="btn bg-info text-light"
                type="submit"
                onClick={handleSearch}
              >
                search
              </button>
            </form>

            <span className="navbar-brand mb-0 h1 text-muted">
              Hello{" "}
              <Link
                to="/myprofile"
                onClick={() => setDisp(10)}
                className="text-dark"
              >{`${Name.firstname}`}</Link>
            </span>
          </nav>
        </div>
      )}
    </div>
  );
};
