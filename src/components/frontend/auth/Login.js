import axios from 'axios';
import React,{useState} from 'react';
import swal from 'sweetalert';
import Navbar from '../../../layouts/frontend/Navbar';
import  './login.css'
import { useHistory } from 'react-router-dom';


const Login = () => {
    const history = useHistory();
    const [loginInput,setLogin] = useState({
      email:'',
      password:'',
      errorList : [],
    });

    const handleInput = (e) => {
      e.persist();
      setLogin({...loginInput,[e.target.name]:e.target.value});
    }
const loginSubmit = (e) => {
e.preventDefault();
const data = {
  email:loginInput.email,
  password:loginInput.password,
}

axios.get('/sanctum/csrf-cookie')
.then(response => {

    axios.post('/api/login',data).then(response => {
          if(response.data.status ===200){
                
                  console.log(response.data);

                  localStorage.setItem('authToken',response.data.access_token);
                   localStorage.setItem('authUserName',response.data.userName);
                   swal("success",response.data.message,"success");
                
                   if(response.data.adminRole==='admin'){
                    history.push("/admin");
                    //history.push("/");
                   }else{
                    history.push("/");
                  }
                  

          }else if(response.data.status ===401) {
            swal("warning",response.data.message,"warning");

          } else{
                setLogin({...loginInput,errorList:response.data.validation_errors});
          }
    })
})

}
  return (
    <>
        <Navbar />
        <div className="body  text-center" >
            <main className="form-signin">
            <form onSubmit={loginSubmit}>
             
              <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
          
              <div className="form-floating">
                <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com"
                name="email" onChange={handleInput} value={loginInput.email}
                />
                <label htmlFor="floatingInput">Email address</label>
                <span>{loginInput.errorList.email}</span>
              </div>
              <div className="form-floating">
                <input type="password" className="form-control" id="floatingPassword" placeholder="Password" 
                 name="password" onChange={handleInput} value={loginInput.password}
                />
                <label htmlFor="floatingPassword">Password</label>
                <span>{loginInput.errorList.password}</span>
              </div>
          
              
              <button className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
              
            </form>
          </main>
        </div>
    </>
  );
};

export default Login;
