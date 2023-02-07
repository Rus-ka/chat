import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import './style.scss'
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

function App() {
  const {currentUser} = useContext(AuthContext);
  
  console.log(currentUser);
  
  const ProtectedRoute = ({children}) => {
    if(!currentUser){
      return <Navigate to="/login"/>
    }

    return children;
  }

  return (
    // <Register/>
    <BrowserRouter>
    <Routes path = '/'>
      <Route index element={
        <ProtectedRoute>
          <Home />
        </ProtectedRoute>
      }/>
      <Route path='login' element={<Login />}/>
      <Route path='register' element={<Register />}/>

    </Routes>
    </BrowserRouter>
  );
}

export default App;
