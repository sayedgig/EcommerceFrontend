import axios from 'axios';
import React, { useEffect,useState } from 'react';
import { Link } from 'react-router-dom';

const ViewProduct = () => {

  const [loading,setLoading] = useState(true);
  const [productList, setProductList] = useState([]);

  useEffect(() => {

    document.title="view product";
        
    axios.get('/api/view-product').then(res=>{
 
      if(res.data.status===200){
    
        setProductList(res.data.products);
      }

      setLoading(false);
    });
   
}, []);


var viewProduct_htmlTable="";

if (loading) {
    return (
        <h4>Loading Product ...</h4>
    );
}else{
    
  viewProduct_htmlTable = 
  productList.map((prod)=>{
        return( <tr key={prod.id}>
            <th scope="row">{prod.id}</th>
            <td>{prod.category.name}</td>
            <td>{prod.slug}</td>
            <td>{prod.name}</td>
            <td>{prod.status}</td>
            <td><Link  to={`/admin/edit-product/${prod.id}`} className="btn btn-success btn-sm">Edit</Link></td>
            <td><button className="btn btn-danger btn-sm">delete </button></td>
</tr>);
       
    });

    //console.log(viewCategory_htmlTable);
}


  return (
    <div className="container px-4">

   <div className="card mt-4">
        
        <div className="cart-header">
            <h4>Product List
                    <Link to="/admin/add-Product" className="btn btn-primary bt-sm float-end">Add Product</Link>
            </h4>
        </div>
        <div className="cart-body">
               <table className="table">
                   <thead>
                       <tr>
                       <th scope="col">ID</th>
                       
                       <th scope="col">category_id</th>
                       <th scope="col">Slug</th>
                       <th scope="col">Name</th>
                       <th scope="col">Status</th>
                       <th scope="col">Edit</th>
                       <th scope="col">Delete</th>
                       </tr>
                   </thead>
                   <tbody>
                   {viewProduct_htmlTable}
                   </tbody>
               </table>
        </div>
    </div>


    </div>
 );
};



export default ViewProduct;
