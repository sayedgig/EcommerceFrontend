import axios from 'axios';
import React, { useEffect,useState } from 'react';
import { Link,useHistory } from 'react-router-dom';
import swal from 'sweetalert';

import Navbar from '../../../layouts/frontend/Navbar'

const Cart = (props) => {

        
  const history = useHistory();
  const [cart, setCart] = useState([]);
  const [loding, setLoding] = useState(true);
  

  useEffect(() => {
    let isMounted = true;
    
  if (!localStorage.getItem('authToken') ){

    history.push('/') ;
    swal("warning","login to cart data page","error");
  }  
  
    axios.get(`/api/cart`).then(res => {
      
      if (res.data.status===200){
        if(isMounted){
          setCart(res.data.cart);
          setLoding(false);
        }
      }else if(res.data.status===401){
           history.push('/') ;
           swal("warning",res.data.message,"error");
      }
  
    });


    return (()=>{
      isMounted=false
    });
  
  },[history]);
  
const handleDecriment= () =>{

}
const handleIncriment= () =>{

}

  if (loding){
    return (<h6>Loading cart data ...</h6>);
  }else {
      var cart_table ='';
     
      cart_table = cart.map((item) => {
          return (
            <tr>
            <th scope="row">{item.product.name}</th>
            <td width="15%" className="text-center">{item.product.selling_price}</td>
            <td width="15%">

                    <div className="input-group">
                       <button type="button" onClick={handleDecriment} className="input-group-text">-</button>
                    
                        <div className="form-control text-center">{item.product_qty}</div>
                        <button type="button" onClick={handleIncriment}  className="input-group-text">+</button>

                </div>
            </td>
            <td width="15%" className="text-center">{item.product.selling_price * item.product_qty}</td>
            <td width="10%">
                <button type="button" className="btn btn-danger btn-sm"> Remove</button>
            </td>
            </tr>
          )
      });

      var cart_html = ''
      if (cart.length>0) {
        cart_html = 
                <table class="table table-striped">

                <thead>
                    <tr>
                    <th scope="col">product name</th>
                    <th scope="col" className="text-center">price</th>
                    <th scope="col" className="text-center">quantity</th>
                    <th scope="col" className="text-center">total price</th>
                    <th scope="col">remove</th>
                    </tr>
                </thead>
                <tbody>
                
                    {cart_table}
                </tbody>
                </table>

      }else
      {
        cart_html = 
        <div className="card card-body py-5 text-center shadow-sm">
            <h4>Cart is empty</h4>
        </div>
      }
  }
  return (
    <div>
       <Navbar />
      <div className="py-3 bg-warning">
        <div className="container">
          <h6>Home / Cart</h6>
        </div>
      </div>
      <div className="py-3">
        <div className="container">
          <div className="row">
               <div className="col-md-12">
                {cart_html}
               </div>

          </div>
        </div>
      </div>
    </div>
  

    
  );
};

export default Cart