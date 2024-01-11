import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CompleteProfile from "./components/CompleteProfile";
import Login from "./components/Login";
import Signup from "./components/Signup";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Signup/>,
  },
  {
    path: "/login",
    element: <Login/>,
  },
  {
    path: "/newprofile",
    element: <CompleteProfile/>,
  },
]);

function App() {
  return (
    <div className="App">
      <Navbar />
      <RouterProvider router={router} />
      <Footer />
    </div>
  );
}

export default App;
