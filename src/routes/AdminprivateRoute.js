import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {  Route, Redirect} from 'react-router-dom';
import MasterLayout from './../layouts/admin/MasterLayout';
import aswal from 'sweetalert';
import { useHistory } from 'react-router-dom';

const AdminPrivateRoute = () => {
  const history = useHistory();
  const [authenticated, setAuthenticated] = useState(false);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/api/checkAuth').then(res=>{
      if (res.data.status===200){
        setAuthenticated(true);
        
      }
      setLoading(false);
     
    })
    return () =>{
      setAuthenticated(false);
    }

  }, []);

  axios.interceptors.response.use(undefined , function axiosRetryinterceptor(err){
    if(err.response.status===401){
         aswal('warning','there are error','warning')  ; 
    }else {
      aswal('warning',`there are error ${err.response.status}`,'warning')  ; 
    }
    history.push('/');
     
    return Promise.reject(err);
  });

  axios.interceptors.response.use( 
    (response) =>  response ,
    (err) => {
      if(err.response.status===403){
        aswal('forbidden',`there are error ${err.response.message}`,'warning')  ; 
        history.push('/403');
      }else  if(err.response.status===404){
        aswal('404 error',`your page is not found `,'warning')  ; 
        history.push('/404');
      }
      return Promise.reject(err);
    }
    );

  
  if (loading){
   return (<h1>Loading...</h1>)
  }

 



  return (  

    <Route exact path='/admin'>
   
    { !authenticated ? <Redirect to="/login" />: <MasterLayout />}
    
    </Route> 
  );

    // <Route {...rest} 
    // render = { ({props,location}) =>{
    //     if(localStorage.getItem('authToken')){
    //         (<MasterLayout {...props} />)
    //     }else{
    //        (<Redirect to={{pathname:"/login" , state:location}} />)
    //     }
    // } }
    // >
    
    // </Route>);


      // <Route exact
                //  path='/admin' 
                //  name='Admin'
                //  //rendor = {(props)=> <MasterLayout {...props} />} />
                //  render={(props) => <MasterLayout {...props} />} 
                //  />

                // <AdminPrivateRoute exact path='/admin' name='Admin'  />

};

export default AdminPrivateRoute;
