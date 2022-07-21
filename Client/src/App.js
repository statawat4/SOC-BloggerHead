import "./App.css";

import { Navbarelements } from "./components/navbar/navbarelements.js";
import { Background } from "./components/background";
import { Routes, Route } from "react-router-dom";
import { Login } from "./pages/login";
import { Signup } from "./pages/signup";
import { About } from "./components/navbar/about";
import { Home } from "./components/home";
import { Create } from "./components/createblog";
import { useEffect, useState } from "react";
import { Blog } from "./components/searchblog";
import { Blogs } from "./components/Blogs";
import { CompleteBlog } from "./components/CompleteBlog";
import { Myprofile } from "./components/myprofile";
import { EditUser } from "./pages/edituser";
import { DelUser } from "./pages/deluser";
import { EditBlog } from "./pages/editblog";
import { DelBlog } from "./pages/delblog";

function App() {
  var [jwt_token, setToken] = useState(null);
  var [Name, setName] = useState(null);
  var [word, setWord] = useState(null);
  var [BlogId, setBlogId] = useState(null);
  var [disp, setDisp] = useState(10);
  var [page, setPage] = useState(0); // 0 for all blogs, 1 for search blogs and 2 for profile blogs
  useEffect(() => {
    var localToken = localStorage.getItem("token");
    var localUser = localStorage.getItem("User");
    if (localToken && localUser) {
      setToken(localToken);
      setName(JSON.parse(localUser));
    }
  }, []);

  return (
    <div>
      <Navbarelements
        jwt_token={jwt_token}
        setToken={setToken}
        Name={Name}
        setName={setName}
        word={word}
        setWord={setWord}
        page={page}
        setDisp={setDisp}
      />
      <Background />
      <Routes>
        <Route
          exact
          path="/"
          element={<Home jwt_token={jwt_token} setDisp={setDisp} setBlogId={setBlogId} setPage={setPage}/>}
        ></Route>
        <Route exact path="/about" element={<About />}></Route>
        <Route
          exact
          path="/login"
          element={<Login setToken={setToken} setName={setName} />}
        ></Route>
        <Route exact path="/signup" element={<Signup />}></Route>
        <Route
          exact
          path="/create"
          element={<Create jwt_token={jwt_token} Name={Name} />}
        ></Route>
        <Route
          exact
          path="/search"
          element={
            <Blog
              word={word}
              setBlogId={setBlogId}
              setPage={setPage}
              disp={disp}
              setDisp={setDisp}
            />
          }
        ></Route>
        <Route
          exact
          path="/blogs"
          element={
            <Blogs
              setBlogId={setBlogId}
              disp={disp}
              setDisp={setDisp}
              setPage={setPage}
            />
          }
        ></Route>
        <Route
          exact
          path="/blog"
          element={<CompleteBlog BlogId={BlogId} page={page} />}
        ></Route>
        <Route
          exact
          path="/myprofile"
          element={
            <Myprofile
              jwt_token={jwt_token}
              Name={Name}
              setBlogId={setBlogId}
              setPage={setPage}
              disp={disp}
              setDisp={setDisp}
            />
          }
        ></Route>
        <Route
          exact
          path="/edituser"
          element={<EditUser Name={Name} setName={setName} />}
        ></Route>
        <Route
          exact
          path="/deluser"
          element={<DelUser Name={Name} setName={setName} setToken={setToken} />}
        ></Route>
        <Route
          exact
          path="/editblog"
          element={
            <EditBlog
              jwt_token={jwt_token}
              BlogId={BlogId}
              setBlogId={setBlogId}
            />
          }
        ></Route>
        <Route
          exact
          path="/delblog"
          element={
            <DelBlog
              BlogId={BlogId}
              setBlogId={setBlogId}
              Name={Name}
            />
          }
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
