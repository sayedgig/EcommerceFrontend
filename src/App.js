import React from 'react';


import MasterLayout from './layouts/admin/MasterLayout';
import { BrowserRouter as Router, Route, Switch ,Redirect} from 'react-router-dom';
import Home from './components/frontend/Home';
import Login from './components/frontend/auth/Login';
import Register from './components/frontend/auth/Register';
import axios from 'axios';
import AdminPrivateRoute from './routes/AdminprivateRoute';
import page404 from './components/errors/page404';
import page403 from './components/errors/page403';
import ViewCategory from './components/frontend/collections/ViewCategory';
import ViewProduct from './components/frontend/collections/ViewMyProduct';
import ViewMyProduct from './components/frontend/collections/ViewMyProduct';
import ProductDetail from './components/frontend/collections/ProductDetail';
import Cart from './components/frontend/collections/Cart';
import Checkout from './components/frontend/collections/Checkout';


 
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

    return (
       

            <Router>
            <div>
                <Switch>
                

                <Route exact
                 path='/' 
                 name='Home'
                 //rendor = {(props)=> <MasterLayout {...props} />} />
                 render={(props) => <Home {...props} />} 
                 />

                <Route path='/404'render={(props) => <page404 {...props} />} />
                <Route path='/403'render={(props) => <page403 {...props} />} />
                 {/* <Route exact
                 path='/register' 
                 name='Register'
                 //rendor = {(props)=> <MasterLayout {...props} />} />
                 render={(props) => <Register {...props} />} 
                 />

                 <Route exact
                 path='/login' 
                 name='Login'
                 //rendor = {(props)=> <MasterLayout {...props} />} />
                 render={(props) => <Login {...props} />} 
                 /> */}

              

                <Route path='/login'>
                    { localStorage.getItem('authToken') ? <Redirect to="/" />: <Login />}
                </Route> 

                <Route   path="/collections/:category/:product" component={ProductDetail} />
                <Route  exact path="/collections/:slug" component={ViewMyProduct} />
               
                <Route  exact path="/cart" component={Cart} />  
                <Route  exact path="/checkout" component={Checkout} /> 
                
                <Route exact path='/collections'>
                    <ViewCategory />
                </Route>  

                


                


                <Route path='/register'>
                    { localStorage.getItem('authToken') ? <Redirect to="/" />: <Register />}
                </Route> 

               

                {/* <AdminPrivateRoute /> */}
              

                

                </Switch>
            </div>
            </Router>
    );
};
 
export default App;