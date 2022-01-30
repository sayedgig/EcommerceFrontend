import React , {useState} from 'react';
import axios from 'axios';
import apiClient from '../services/api';

const Login = () => {

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const handleSubmit = (e) => {
        e.preventDefault();

        axios.get('http://localhost:8000/api/sanctum/csrf-cookie')
            .then(response => {
                apiClient.post('http://localhost:8000/api/register', {
                    email: email,
                    password: password
                }).then(response => {
                    console.log(response)
                })
            });

        // axios.get('http://localhost:8000/api/sanctum/csrf-cookie')
        //     .then(response => {
        //         axios.post('http://localhost:8000/api/login', {
        //             email: email,
        //             password: password
        //         }).then(response => {
        //             console.log(response)
        //         })
        //     });

        // axios.post('http://localhost:8000/api/login', {
        //     email: email,
        //     password: password
        // }).then(response => {
        //     console.log(response)
        // });
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
        <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
        />
        <button type="submit">Login</button>
    </form>
</div>

  );
};

export default Login;
