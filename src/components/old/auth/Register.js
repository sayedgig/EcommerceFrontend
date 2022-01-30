import React , {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import aswal from 'sweetalert';
import swal from 'sweetalert';
const Register = () => {
    const history = useNavigate();
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [errorList, setErrorList] = React.useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {name ,email,password};
        axios.get('/sanctum/csrf-cookie')
        .then(response => {
            axios.post('/api/register', {
                name:name,
                email: email,
                password: password
            }).then(response => {
              
               if(response.data.status ==="200"){
                   console.log("hello if")
                   localStorage.setItem('authToken',response.data.access_token);
                   localStorage.setItem('authUserName',response.data.userName);
                   swal("success",response.data.message,"success");
                  // history.push("/");
    
               }else{
                console.log("hello else")
                //setErrorList(response.data.validationErrors);
               }
            })
        });
    
    }

   

  return (
            <div>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    required
                />
                <span >{errorList.name}</span>
                <br />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                />
                <span >{errorList.email}</span>
                <br />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                />
                <span >{errorList.password}</span>
                <br />
                <button type="submit">Login</button>
            </form>
        </div>


  );
};

export default Register;
