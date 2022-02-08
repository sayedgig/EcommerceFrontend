import React from 'react';
import Footer from './Footer';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import '../../assets/admin/css/styles.css';
import '../../assets/admin/js/scripts.js';

import { BrowserRouter as Router, Route, Switch ,Redirect } from 'react-router-dom';
import Dashboard from '../../components/admin/Dashboard';
import Profile from '../../components/admin/Profile';

//category
import AddCategory from '../../components/admin/Category/AddCategory';
import ViewCategory from '../../components/admin/Category/ViewCategory';
import EditCategory from '../../components/admin/Category/EditCategory';

//products 
import AddProduct from '../../components/admin/Product/AddProduct';
import ViewProduct from '../../components/admin/Product/ViewProduct';
import EditProduct from '../../components/admin/Product/EditProduct';


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
                              <Route 
                              path='/admin/dashboard' 
                              name='Dashboard'
                              render={(props) => <Dashboard {...props} />} 
                              />
                              <Route 
                              path='/admin/profile' 
                              name='Profile'
                              render={(props) => <Profile {...props} />} 
                              />

                            {/* Category */}
                            <Route path='/admin/add-category' name='add-category'
                              render={(props) => <AddCategory {...props} />} />

                             <Route path='/admin/view-category' name='view-category'
                              render={(props) => <ViewCategory {...props} />} />

                              <Route  path='/admin/edit-category/:id'  exact name='edit-category'
                              render={(props) => <EditCategory {...props} />} />

                              {/* Product */}

                              <Route path='/admin/add-product' name='add-product'
                              render={(props) => <AddProduct {...props} />} />

                             <Route path='/admin/view-product' name='view-product'
                              render={(props) => <ViewProduct {...props} />} />
                              
                              <Route  path='/admin/edit-product/:id'  exact name='edit-product'
                              render={(props) => <EditProduct {...props} />} />        

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
