import axios from 'axios';
import React, { useEffect,useState } from 'react';
import { Link,useHistory } from 'react-router-dom';
import swal from 'sweetalert';

import Navbar from '../../../layouts/frontend/Navbar'

const Cart = (props) => {

        
  const history = useHistory();
  const [cart, setCart] = useState([]);
  const [loding, setLoding] = useState(true);
  var totalCartPrice = 0;

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
  
const handleDecriment= (cart_id) =>{
    
    setCart(cart.map(item => {
        const $unit = item.product_qty >0 ? 1 :0 ;
      return  item.id===cart_id ? {...item,product_qty:item.product_qty -$unit} : item
    }));
    console.log(cart[0]);
    updateCartQuantity(cart_id,"dec");
     //swal("success",cart[0].product_qty,"success")

}
const handleIncriment= (cart_id) =>{
    setCart(cart.map(item => {
        const $unit = item.product_qty <10 ? 1 :0 ;
      return  item.id===cart_id ? {...item,product_qty:item.product_qty +$unit} : item
    }));
    console.log(cart[0]);
    updateCartQuantity(cart_id,"inc");
     //swal("success",cart[0].product_qty,"success")
}

const handleDelete = (e,cart_id) =>{

    e.preventDefault();
    const thisClick = e.target;
    thisClick.innerText="removing....";
    axios.delete(`/api/delete-cartitem/${cart_id}`).then(res=>{
        if(res.data.status===200){
            swal("success",res.data.message,"success");
            thisClick.closest("tr").remove();
            
        }else if(res.data.status===404){
            swal("error",res.data.message,"error");
            thisClick.innerText="remove";
        }
    });

}

const updateCartQuantity = (cart_id,scope,qty) => {
    axios.put(`/api/update-quantity/${cart_id}/${scope}`).then(res => {
        //console.log(res.data.status);
        if(res.data.status===200){
            swal("success",res.data.message,"success");
        }else if(res.data.status===404){
            swal("warning",res.data.message,"warning");
        }else if(res.data.status===401){
            swal("warning",res.data.message,"warning");
        }
    });

}

  if (loding){
    return (<h6>Loading cart data ...</h6>);
  }else {
      var cart_table ='';
     
      cart_table = cart.map((item) => {
          totalCartPrice += item.product.selling_price * item.product_qty;
          return (
            <tr>
            <th scope="row">{item.product.name}</th>
            <td width="15%" className="text-center">{item.product.selling_price}</td>
            <td width="15%">

                    <div className="input-group">
                       <button type="button" onClick={(e) => handleDecriment(item.id,e)} className="input-group-text">-</button>
                    
                        <div className="form-control text-center">{item.product_qty}</div>
                        <button type="button" onClick={(e) => handleIncriment(item.id,e)}  className="input-group-text">+</button>

                </div>
            </td>
            <td width="15%" className="text-center">{item.product.selling_price * item.product_qty}</td>
            <td width="10%">
                <button type="button" className="btn btn-danger btn-sm" 
                onClick={(e) => handleDelete(e,item.id)}> Remove</button>
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

                    <div className="col-md-8"></div>
                   <div className="col-md-4">
                       <div className="card card-body mt-3">
                           <h4>sub total
                               <span className="float-end">{totalCartPrice}</span>
                           </h4>
                           <h4>grand total
                               <span className="float-end">{totalCartPrice}</span>
                           </h4>
                           <hr />
                           <Link to="/checkout" className="btn btn-primary" >checkout</Link>

                       </div>

                   </div>
  
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