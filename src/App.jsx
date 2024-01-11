import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CompleteProfile from "./components/CompleteProfile";
import Login from "./components/Login";
import Signup from "./components/Signup";

function App() {
  return (
    <div className="App">
      <Navbar />
      <CompleteProfile/>
      <Login/>
      <Signup/>
      <Footer />
    </div>
  );
}

export default App;
