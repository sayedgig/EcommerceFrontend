import React , {useState} from 'react';
import axios from 'axios';
import aswal from 'sweetalert';

const Login = () => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [errorList, setErrorList] = React.useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.get('/sanctum/csrf-cookie')
        .then(response => {
                            axios.post('/api/login', {
                                            email: email,
                                            password: password
                                        }).then(response => {
                                           
                                            if(response.data.status ==="200"){
                                                localStorage.setItem('authToken',response.data.access_token);
                                                localStorage.setItem('authUserName',response.data.userName);
                                                aswal("success",response.data.message,"success");
                                            }else if (response.data.status ==="401"){
                                                
                                                aswal("warning",response.data.message,"warning");
                                            }else {
                                                setErrorList(response.data.validation_errors);
                                            }
                                        })
                        });
    }
  return (
            <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                />
                <span >{errorList.email}</span>
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                />
                <span >{errorList.password}</span>
                <button type="submit">Login</button>
            </form>
        </div>


  );
};
export default Login;
