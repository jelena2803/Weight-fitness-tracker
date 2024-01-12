import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CompleteProfile from "./components/CompleteProfile";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Profile from "./components/Profile";
// import {
//   BrowserRouter, createBrowserRouter,
//   RouterProvider,
// } from "react-router-dom";
import { Route,Routes } from 'react-router-dom';

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Signup />,
//   },
//   {
//     path: "/login",
//     element: <Login />,
//   },
//   {
//     path: "/newprofile",
//     element: <CompleteProfile />,
//   },
//   {
//     path: "/profile",
//     element: <Profile />,
//   },
// ]);

function App() {
  return (
    <div className="App">
      {/* <BrowserRouter> */}
        <Navbar />
      {/* </BrowserRouter> */}
      <div>
    <Routes>        
      <Route path="/"  element={<Signup/>} />
      <Route path="/login"  element={<Login />}/>
      <Route path="/newprofile"  element={<CompleteProfile/>}/>
      <Route path="/profile"  element={<Profile/>}/>
    </Routes>
    </div>
      {/* <RouterProvider router={router} /> */}
      <Footer />
    </div>
  );
}

export default App;
