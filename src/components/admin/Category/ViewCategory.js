import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link} from 'react-router-dom';

const ViewCategory = () => {
    const [loading,setLoading] = useState(true);
    const [categoryList, setCategoryList] = useState([]);

    useEffect(() => {
        
        axios.get('/api/view-category').then(res=>{
     
          if(res.data.status===200){
        
            setCategoryList(res.data.category);
          }

          setLoading(false);
        });
       
    }, []);

    var viewCategory_htmlTable="";

    if (loading) {
        return (
            <h4>Loading Category ...</h4>
        );
    }else{
        
        viewCategory_htmlTable = 
        categoryList.map((cat)=>{
            return( <tr key={cat.id}>
                <th scope="row">{cat.id}</th>
                <td>{cat.slug}</td>
                <td>{cat.name}</td>
                <td>{cat.status}</td>
                <td><Link  to={`/admin/edit-category/${cat.id}`} className="btn btn-success btn-sm">Edit</Link></td>
                <td>delete</td>
    </tr>);
           
        });

        console.log(viewCategory_htmlTable);
    }

  return (
     <div className="container px-4">

    <div className="card mt-4">
         
         <div className="cart-header">
             <h4>Category List
                     <Link to="/admin/add-category" className="btn btn-primary bt-sm float-end">Add Category</Link>
             </h4>
         </div>
         <div className="cart-body">
                <table className="table">
                    <thead>
                        <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Slug</th>
                        <th scope="col">Name</th>
                        <th scope="col">Status</th>
                        <th scope="col">Edit</th>
                        <th scope="col">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                       {viewCategory_htmlTable}
                    </tbody>
                </table>
         </div>
     </div>


     </div>
  );
};

export default ViewCategory;
