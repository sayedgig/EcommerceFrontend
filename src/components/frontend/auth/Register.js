import axios from 'axios';
import React ,{useState} from 'react';
import { useHistory } from 'react-router-dom';
import swal from 'sweetalert';
import Navbar from '../../../layouts/frontend/Navbar';

const Register = () => {
  const history = useHistory();

  const [registerInput , setRegister]= useState({
    name :'',
    email :'',
    passw0rd:'',
    errorList:[],
  });
  const handeChange = (e)=> {
     e.persist();
     setRegister({...registerInput ,[e.target.name]: e.target.value});
  }
  const RegisterSubmit = (e)=>{
     e.preventDefault();
     const data = {
       name : registerInput.name,
       email : registerInput.email,
       password : registerInput.password,
     }

     //axios.post('/api/register',data).then( res=> {});

     axios.get('/sanctum/csrf-cookie')
        .then(response => {
            axios.post('/api/register',data).then(response => {
              
               if(response.data.status ===200){
                  // console.log("hello if")
                   localStorage.setItem('authToken',response.data.access_token);
                   localStorage.setItem('authUserName',response.data.userName);
                   swal("success",response.data.message,"success");
                   history.push("/");
    
               }else{
                //console.log("hello else")
                setRegister({...registerInput ,errorList: response.data.validation_errors});
 
               }
            })
        });
    
  }

 

  return (
    <>
        <Navbar />
        <div className="body  text-center" >
            <main className="form-signin">
            <form onSubmit={RegisterSubmit}>
             
              <h1 className="h3 mb-3 fw-normal">Register Here</h1>
          
              <div className="form-floating">
              <input type="text" className="form-control" id="floatingInputName" placeholder="name" 
              name ="name" onChange={handeChange} value={registerInput.name}
              />
            <label htmlFor ="floatingInput">Name</label>
              <span>{registerInput.errorList.name}</span>
            </div>
              <div className="form-floating">
                <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" 
                name ="email" onChange={handeChange} value={registerInput.email} />
                <label htmlFor ="floatingInput">Email address</label>
                <span>{registerInput.errorList.email}</span>
              </div>
              <div className="form-floating">
                <input type="password" className="form-control" id="floatingPassword" placeholder="Password" 
                name ="password" onChange={handeChange} value={registerInput.name} />
                <label htmlFor ="floatingPassword">Password</label>
                <span>{registerInput.errorList.password}</span>
              </div>

          
          
              
              <button className="w-100 btn btn-lg btn-primary" type="submit">Register</button>
              
            </form>
          </main>
        </div>
    </>
  );
};

export default Register;
