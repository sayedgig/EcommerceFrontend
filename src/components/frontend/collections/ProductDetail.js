import axios from 'axios';
import React, { useEffect,useState } from 'react';
import { Link,useHistory } from 'react-router-dom';
import swal from 'sweetalert';

import Navbar from '../../../layouts/frontend/Navbar';

const ProductDetail = (props) => {

    
  const history = useHistory();
  const [product, setProduct] = useState([]);
  const [loding, setLoding] = useState(true);
  const [quantity, setQuantity] = useState(1);

  const productCount = product.length;


  const handleDecriment = () => {
    if(quantity>1){
      setQuantity(prev => prev -1);
    }
    
  }
  const handleIncriment = () => {
    if(quantity <10){
      setQuantity(prev => prev +1);
    }
   
  }
useEffect(() => {
  let isMounted = true;
  const producSlug = props.match.params.product;
  const categorySlug = props.match.params.category;

  axios.get(`/api/view-product-details/${categorySlug}/${producSlug}`).then(res => {
    
    if (res.data.status===200){
      if(isMounted){
        //console.log(res.data.category);x
        setProduct(res.data.product);
        setLoding(false);
      }
    }else if(res.data.status===404){
         history.push('/collections') ;
         swal("warning",res.data.message,"error");
    }

  });
  return (()=>{
    isMounted=false
  });

},[props.match.params.category,props.match.params.product,history]);

const submitAddtocart = (e) => {
 e.preventDefault();
 const data = {
   'product_id' : product.id,
   'product_qty':quantity,
 }
   axios.post('/api/add-to-cart',data).then(res => {
     if (res.data.status===201){
       swal("success",res.data.message,"success");

     }else if (res.data.status===409){
      swal("warning",res.data.message,"warning");
      }else if (res.data.status===401){
      swal("warning",res.data.message,"warning");
     }else if (res.data.status===404){
      swal("warning",res.data.message,"warning");

     }
   });

}

if (loding){
  return (<h6>Loading product details ...</h6>);
}else {
  var avail_stock = '';
  if (product.quantity >0){
        avail_stock = 
        <div>
                       <label className="btn-sm btn-success px-4 mt-2">in stock</label>
                       <div className="row">
                         <div className="col-md-3 mt-3">
                           <div className="input-group">
                             <button type="button" onClick={handleDecriment} className="input-group-text">-</button>
                             
                             <div className="form-control text-center">{quantity}</div>
                             <button type="button" onClick={handleIncriment}  className="input-group-text">+</button>

                           </div>
                         </div>
                         <div className="col-md-3 mt-3">
                         <button type="submit" className="btn-primary w-100" onClick={submitAddtocart}>add to cart</button>
                         
                         </div>
                       </div>
                  </div>
  }else{

    avail_stock = 
    <div>
                   <label className="btn-sm btn-danger px-4 mt-2">out of stock</label>
    </div>
  }
}


    return (
        <div>
           <Navbar />
          <div className="py-3 bg-warning">
            <div className="container">
              <h6>Collections / {product.category.name} / {product.name} </h6>
            </div>
          </div>
          <div className="py-3">
            <div className="container">
              <div className="row">
                  
                <div className="col-md-12">
                  <h4>
                    {product.name}
                    <span className="float-end badge btn-sm btn-danger padge-pil">{product.brand}</span>
                  </h4>
                  <p>{product.description}</p>
                  <h4 className="mb-1">
                      Rs:{product.selling_price}
                      <s className="ms-2">rs:{product.original_price}</s>
                  </h4>

                  {avail_stock}
                  <button type="button" className="btn btn-danger mt-3">add to wishlist</button>
                </div>
        
    
              </div>
            </div>
          </div>
        </div>
    )};

export default ProductDetail;
