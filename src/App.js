import React from 'react';

import Dashboard from './components/admin/Dashboard';
import Profile from './components/admin/Profile';
import MasterLayout from './layouts/admin/MasterLayout';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/frontend/Home';


 
const App = () => {

    return (
       

            <Router>
            <div>
                <Switch>
                <Route exact
                 path='/admin' 
                 name='Admin'
                 //rendor = {(props)=> <MasterLayout {...props} />} />
                 render={(props) => <MasterLayout {...props} />} 
                 />

                <Route exact
                 path='/' 
                 exact
                 name='Home'
                 //rendor = {(props)=> <MasterLayout {...props} />} />
                 render={(props) => <Home {...props} />} 
                 />

                </Switch>
            </div>
            </Router>
    );
};
 
export default App;