import React from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import aswal from 'sweetalert';
import { useHistory } from 'react-router-dom';

const Navbar = () => {
    const history = useHistory();
    var AuthButton ='';

    const logoutSubmit = (e) =>{
       
        e.preventDefault();
        //console.log('ok');
        axios.post('/api/logout').then(response => {
           
            if(response.data.status ===200){
                localStorage.removeItem('authToken');
                localStorage.removeItem('authUserName');
                aswal("success",response.data.message,"success");
                history.push("/");
            }
        })
    }

    if(!localStorage.getItem('authToken')){

        AuthButton = (
            <>
                     <li className="nav-item">
                    <Link className="nav-link" to="/login">Login</Link>
                    </li>
                   
              
                    <li className="nav-item">
                    <Link className="nav-link" to="/register">Register</Link>
                    </li>
            </>
  
        )
    }else{
        AuthButton = (
            <>  
                <li className="nav-item">
                    <button 
                    type="button" 
                    className="nav-link btn btn-danger bt-sm text-white"
                    onClick={logoutSubmit} >Logout</button>
                </li>
            </>
        )

    }
    
  return (

        <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow sticky-top">
            <div className="container">
                <Link className="navbar-brand" to="#">Navbar</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                    <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                    </li>

                    <li className="nav-item">
                    <Link className="nav-link" to="#">collection</Link>
                    </li>

                    {AuthButton}
                   

                    
                   
                   
                </ul>
               
                </div>
            </div>
        </nav>
  );
};

export default Navbar;
