import React from 'react';
//import { BrowserRouter as Router,Routes, Route, Link } from 'react-router-dom';
import { Route, BrowserRouter as Router, Routes, Link } from 'react-router-dom';
import Mybooks from './components/Mybooks';
import Test from './components/old/Test';
import Login from './components/old/auth/Login';
import Register from './components/old/auth/Register';
import axios from 'axios';
import aswal from 'sweetalert';

 
const App = () => {
    axios.defaults.withCredentials=true;
    axios.defaults.baseURL ="http://localhost:8000"
    axios.defaults.headers.post['Accept']='application/json';
    axios.defaults.headers.post['Content-Type']='application/json';
    axios.interceptors.request.use((config) => {
           const token = localStorage.getItem('authToken');
           config.headers.authorization = token ? `Bearer $(token)` : '';
           return config;
        }
    );

    const logoutSubmit = (e) =>{
        e.preventDefault();
        axios.post('/api/logout').then(response => {
           
            if(response.data.status ==="200"){
                localStorage.removeItem('authToken');
                localStorage.removeItem('authUserName');
                aswal("success",response.data.message,"success");
            }
        })
    }

    var AuthButton ='';
    if(!localStorage.getItem('authToken')){

        AuthButton = (
            <>
                    <br />
                    <Link to='/login'>login</Link>
                    <br />
                    <Link to='/register'>Register</Link>
            </>
  
        )
    }else{
        AuthButton = (
            <>  
                <br />
                <button type='button' onClick={logoutSubmit}>Logout</button>
            </>
        )

    }
    
    return (
        <Router>
            <div>
          
                <Link to='/books'>Books</Link>
                 {AuthButton}
            </div>
            <Routes>
                <Route  path='/books' element={<Mybooks />} />
                
                <Route path='/login'  element={<Login /> } />
                <Route path='/register'  element={<Register /> } />
                <Route exact path="/" element={<Test />} />
            </Routes>
        </Router>
    );
};
 
export default App;