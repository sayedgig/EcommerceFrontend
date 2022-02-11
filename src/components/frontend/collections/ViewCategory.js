import axios from 'axios';
import React, { useEffect,useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../../layouts/frontend/Navbar';


const ViewCategory = () => {

  const [category, setCategory] = useState([]);
  const [loding, setLoding] = useState(true);

useEffect(() => {
  let isMountered = true;
  axios.get('/api/get-category').then(res => {
    
    if (res.data.status===200){
      if(isMountered){
        //console.log(res.data.category);x
        setCategory(res.data.category);
        setLoding(false);
      }
    }

  });
  return (()=>{
    isMountered=false
  });

},[]);

if (loding){
  return (<h6>Loading category data ...</h6>);
}
else
{
    var showCategoryList ='';
    showCategoryList = category.map((item,ind) =>{
      return (
        <div className="col-md-4" key={ind}>
          <div className="card">
            <div className="card-body">
              <Link to = {`/collections/${item.slug}`}>
              <h5>{item.name}</h5>
              </Link>
            </div>
          </div>
        </div>
      );
    });
}
  return (
    <div>
       <Navbar />
      <div className="py-3 bg-warning">
        <div className="container">
          <h6>Category Page</h6>
        </div>
      </div>
      <div className="py-3">
        <div className="container">
          <div className="row">
               {showCategoryList}

          </div>
        </div>
      </div>
    </div>
  

    
  );
};

export default ViewCategory;
