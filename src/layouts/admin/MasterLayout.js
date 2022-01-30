import React from 'react';
import Footer from './Footer';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import '../../assets/admin/css/styles.css';
import '../../assets/admin/js/scripts.js';
import routes from '../../routes/routes';
import { BrowserRouter as Router, Route, Switch ,Redirect } from 'react-router-dom';
import Dashboard from '../../components/admin/Dashboard';
import Profile from '../../components/admin/Profile';


const MasterLayout = () => {
  return(
    <Router>
    <div className="sb-nav-fixed">
            <Navbar />
            <div id="layoutSidenav">
                <div id="layoutSidenav_nav">
                    <Sidebar />
                </div>
                <div id="layoutSidenav_content">
                    <main>
                    
                      
                          <div>
                              <Switch>
                              <Route exact
                              path='/admin/dashboard' 
                              name='Dashboard'
                              render={(props) => <Dashboard {...props} />} 
                              />
                              <Route exact
                              path='/admin/profile' 
                              name='Profile'
                              render={(props) => <Profile {...props} />} 
                              />
                              <Redirect  from="/admin" to="/admin/dashboard"/>
                              </Switch>

                          </div>
                       
                   
                  
                         {/* <Switch>
                            {
                              routes.map((route,index) => {
                                route.component && 
                                (<Route 
                                key ={index}
                                path = {route.path}
                                exact = {route.exact}
                                name = {route.name}
                                // render = {
                                //   (props) => (<route.component {...props} />)
                                // }

                                render={(props) => < route.component />}
                                /> )
              
                              })
                            } 
                            <Redirect  from="admin" to="/admin/dashboard"/>
                        </Switch>  */}

              
                    </main>
                    <Footer />
                </div>
            </div>
           
    </div>
    </Router>
  );
};

export default MasterLayout;
