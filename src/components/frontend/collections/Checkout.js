import axios from 'axios';
import React, { useEffect,useState } from 'react';
import { Link,useHistory } from 'react-router-dom';
import swal from 'sweetalert';

import Navbar from '../../../layouts/frontend/Navbar';

const Checkout = () => {
         
  const history = useHistory();
  const [cart, setCart] = useState([]);
  const [loding, setLoding] = useState(true);
  var totalCartPrice = 0;
  
  const [errorList, setError] = useState([]);
  const [checkoutInput, setCheckout] = useState({
    'firstname':'', 
    'lastname':'', 
    'phone':'', 
    'email':'', 
    'address':'', 
    'city':'', 
    'state':'', 
    'zipcode':'', 
  });

const handleInput = (e) => {
    e.persist();
    setCheckout({...checkoutInput,[e.target.name]:e.target.value});

}

const submitOrder = (e) =>{
    e.preventDefault();
    const data = {
        'firstname':checkoutInput.firstname, 
        'lastname':checkoutInput.lastname, 
        'phone':checkoutInput.phone, 
        'email':checkoutInput.email, 
        'address':checkoutInput.address, 
        'city':checkoutInput.city, 
        'state':checkoutInput.state, 
        'zipcode':checkoutInput.zipcode,   
    };

    axios.post(`/api/place-order`,data).then(
        res => {
            if(res.data.status===200){
                    swal("order placed successfully",res.data.message,"success");
                    setError([]);
                    history.push("/thank-you");
            }else if(res.data.status===422){
                swal("All fields are mandatory","","success");
                setError(res.data.errors);
            }
        }
    );
}

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
  
  if (loding){
    return (<h6>Loading ckeckout  ...</h6>);
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
                  
                      <div className="form-control text-center">{item.product_qty}</div>
              </div>
          </td>
          <td width="20%" className="text-center">{item.product.selling_price * item.product_qty}</td>
          
          </tr>
        )
    });



  }
    return (
        <div>
           <Navbar />
          <div className="py-3 bg-warning">
            <div className="container">
              <h6>Home / checkout</h6>
            </div>
          </div>

          <div className="py-3">
            <div className="container">
               <div className="row">
                   <div className="col-md-7">
                       <div className="card">
                           <div className="card-header">
                               <h4>Basic information</h4>
                           </div>
                           <div className="card-body">
                               <div className="row">
                                   <div className="col-md-6">
                                       <div className="form-group mb-3">
                                           <label>first name</label>
                                           <input type="text" className="form-control" 
                                           name="firstname" 
                                            onChange={handleInput} value={checkoutInput.firstname}/>
                                           <small className="text-danger">{errorList.firstname}</small>
                                       </div>
                                    </div>
                                    <div className="col-md-6">
                                       <div className="form-group mb-3">
                                           <label>last name</label>
                                           <input type="text" className="form-control" 
                                           name="lastname"  
                                           onChange={handleInput} value={checkoutInput.lastname}/>
                                        <small className="text-danger">{errorList.lastname}</small>
                                       </div>
                                    </div>
                                    <div className="col-md-6">
                                       <div className="form-group mb-3">
                                           <label>phone number</label>
                                           <input type="text" className="form-control" 
                                           name="phone"   onChange={handleInput} value={checkoutInput.phone}/>
 <small className="text-danger">{errorList.phone}</small>
                                       </div>
                                    </div>
                                    <div className="col-md-6">
                                       <div className="form-group mb-3">
                                           <label>email address</label>
                                           <input type="text" className="form-control"
                                            name="email"   onChange={handleInput} value={checkoutInput.email}/>
                                      <small className="text-danger">{errorList.email}</small>
                                       </div>
                                    </div>
                                    <div className="col-md-12">
                                       <div className="form-group mb-3">
                                           <label>full address</label>
                                           <textarea type="text" row="2" className="form-control" 
                                           name="address"   onChange={handleInput} value={checkoutInput.address}></textarea>
                                            <small className="text-danger">{errorList.address}</small>
                                           
                                       </div>
                                    </div>
                                    <div className="col-md-4">
                                       <div className="form-group mb-3">
                                           <label>city</label>
                                           <input type="text" className="form-control" 
                                           name="city"   onChange={handleInput} value={checkoutInput.city}/>
<small className="text-danger">{errorList.city}</small>
                                           
                                       </div>
                                    </div>
                                    <div className="col-md-4">
                                       <div className="form-group mb-3">
                                           <label>state</label>
                                           <input type="text" className="form-control" 
                                           name="state"   onChange={handleInput} value={checkoutInput.state}/>
<small className="text-danger">{errorList.state}</small>
                                       </div>
                                    </div>
                                    <div className="col-md-4">
                                       <div className="form-group mb-3">
                                           <label>zip code</label>
                                           <input type="text" className="form-control" 
                                           name="zipcode"   onChange={handleInput} value={checkoutInput.zipcode}/>
<small className="text-danger">{errorList.zipcode}</small>
                                       </div>
                                       </div>
                                    <div className="col-md-12">  
                                       <div className="form-group mb-3">
                                           
                                           <button type="button" onClick={submitOrder} className="btn-primary btn-sm" >place order</button>

                                       </div>
                                    </div>

                                   
                               </div>

                           </div>
                       </div>

                   </div>

                   <div className="col-md-5">
                        <table class="table table-striped">
                            <thead>
                                <tr>
                                <th scope="col" width="50%">Product</th>
                                <th scope="col">qty</th>
                                <th scope="col">price</th>
                                <th scope="col">total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cart_table}
                                <tr>
                                    <td colspan="2" className="text-end fw-bold">Grand total </td>
                                    <td colspan="2" className="text-end fw-bold">{totalCartPrice} </td>
                                </tr>
                            </tbody>
                            </table>
                   </div>
                </div>
            </div>
           </div>
    </div>
  )
}

export default Checkout