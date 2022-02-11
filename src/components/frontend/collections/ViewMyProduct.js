import axios from 'axios';
import React, { useEffect,useState } from 'react';
import { Link,useHistory } from 'react-router-dom';
import swal from 'sweetalert';
import Navbar from '../../../layouts/frontend/Navbar';

const ViewMyProduct = (props) => {

  const history = useHistory();
  const [product, setProduct] = useState([]);
  const [loding, setLoding] = useState(true);
  const [category, setCategory] = useState([]);

  const productCount = product.length;

useEffect(() => {
  let isMounted = true;
  const producSlug = props.match.params.slug;
  axios.get(`/api/fetch-products/${producSlug}`).then(res => {
    
    if (res.data.status===200){
      if(isMounted){
        //console.log(res.data.category);x
        setProduct(res.data.product_data.product);
        setCategory(res.data.product_data.category);
        setLoding(false);
      }
    }else if(res.data.status===404){
         history.push('/collections') ;
         swal("warning",res.data.message,"error");
    }else if(res.data.status===400){
        swal("warning",res.data.message,"error");
   }

  });
  return (()=>{
    isMounted=false
  });

},[props.match.params.slug,history]);

if (loding){
  return (<h6>Loading product data ...</h6>);
}
else
{
    var showProductList ='';
    if(productCount){
        showProductList = product.map((item,ind) =>{
            return (
              <div className="col-md-3" key={ind}>
                <div className="card">
                  <div className="card-body">
                    <Link to = {`/collections/${item.category.slug}/${item.slug}`}>
                    <h5>{item.name}</h5>
                    </Link>
                  </div>
                </div>
              </div>
            );
          });

    }else{
        showProductList =
              <div className="col-md-12">
                
                   <h2>products are not availlable for {category.name}</h2> 
               
              </div>
            

    }
   
}

    return (
        <div>
           <Navbar />
          <div className="py-3 bg-warning">
            <div className="container">
              <h6>Collections / {category.name}</h6>
            </div>
          </div>
          <div className="py-3">
            <div className="container">
              <div className="row">
                  
                {showProductList}
        
    
              </div>
            </div>
          </div>
        </div>
    )};

export default ViewMyProduct;

