import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import aswal from 'sweetalert';

const Addproduct = () => {

  const [picture, setpicture] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  useEffect(() => {
    axios.get('/api/all-category').then(res => {
          if(res.data.status===200){
            setCategoryList(res.data.category);
         

          }
    });
  

  }, []);

  const [productInput, setProduct] = useState({
    category_id : '',
    slug : '',
    name:'',
    description:'',
    meta_title:'',
    meta_keyword:'',
    meta_description:'',
    selling_price:'',
    original_price:'',
    quantity:'',
    brand:'',
    
    feature:'',
    popular:'',
    status:'',

  });

  const [errorList, setErrorList] = useState([]);
  const handleInput = (e) => {
     e.persist();
     setProduct({...productInput , [e.target.name]:e.target.value});

  }

  const handleImage = (e) => {
      
    setpicture({ image:e.target.file[0]});
  }

  const submitProduct = (e) =>{
    e.preventDefault();
    const formData = new FormData();
 
  //formData.append('image',picture.image);

  formData.append('category_id',productInput.category_id);
  formData.append('slug',productInput.slug);
  formData.append('name',productInput.name);
  //formData.append('description',productInput.description);

  formData.append('meta_title',productInput.meta_title);
  //formData.append('meta_keyword',productInput.meta_keyword);
  //formData.append('meta_description',productInput.meta_description);

  formData.append('selling_price',productInput.selling_price);
  formData.append('original_price',productInput.original_price);
  formData.append('quantity',productInput.quantity);
  formData.append('brand',productInput.brand);
  //formData.append('feature',productInput.feature);
  //formData.append('popular',productInput.popular);
  formData.append('status',productInput.status);

    axios.post('/api/store-product',formData).then(res=>{
        if(res.data.status===200){
            aswal("success",res.data.message,"success");
            setErrorList([]);
        } else if(res.data.status===422){
          aswal("warning","All fields are mandatory","warning");
          setErrorList(res.data.errors);
        }
      
    });
  }
  
  return (
    <div className="container px-4">
          <div className="card mt-4">
            <div className="card-header">
              <h4>Add Product
                <Link to="/admin/view-product" className="btn btn-primary btn-sm float-end">View Product</Link>
              </h4>
            </div>
            <div className="card-body">

              <form onSubmit={submitProduct} encType="multipart/form-data">

              
                <ul className="nav nav-tabs" id="myTab" role="tablist">
                      <li className="nav-item" role="presentation">
                        <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Home</button>
                      </li>
                      <li className="nav-item" role="presentation">
                        <button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">Profile</button>
                      </li>
                      <li className="nav-item" role="presentation">
                        <button className="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact" type="button" role="tab" aria-controls="contact" aria-selected="false">Contact</button>
                      </li>
                </ul>
                <div className="tab-content" id="myTabContent">
                      <div className="tab-pane fade show active cart-body border p-4" id="home" role="tabpanel" aria-labelledby="home-tab">
                        <div className="mb-3">
                          <select 
                          name="category_id" onChange={handleInput} value={productInput.category_id}
                          className="form-select" aria-label="Default select example">
                          <option >Category</option>
                            { 
                            categoryList.map((category) => {
                              return (<option value={category.id} key={category.id}>{category.name}</option>)
                              
                            })
                          
                            }
                             
                              
                          </select>
                          <small className="text-danger">{setErrorList.category_id}</small>
                        </div>
                          <div className="mb-3">
                            <label htmlFor="exampleFormControlInput1" className="form-label">slug</label>
                            <input name="slug" onChange={handleInput} value={productInput.slug}
                            type="text" className="form-control" id="exampleFormControlInput1" placeholder="slug" />
                         <small className="text-danger">{errorList.slug}</small>
                          </div>
                          <div className="mb-3">
                            <label htmlFor="exampleFormControlInputName" className="form-label">name</label>
                            <input name="name" onChange={handleInput} value={productInput.name}
                            type="text" className="form-control" id="exampleFormControlInputName" placeholder="name" />
                         <small className="text-danger">{errorList.name}</small>
                          </div>
                          <div className="mb-3">
                            <label htmlFor="exampleFormControlTextarea1" className="form-label">Description</label>
                            <textarea name="description" onChange={handleInput} value={productInput.description}
                            className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                          </div>
                        
                        </div>
                      <div className="tab-pane fade cart-body border p-4" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                      
                         <div className="mb-3">
                            <label htmlFor="exampleFormControlInput11" className="form-label">meta title</label>
                            <input name="meta_title" onChange={handleInput} value={productInput.meta_title}
                            type="text" className="form-control" id="exampleFormControlInput11" placeholder="slug" />
                         <small className="text-danger">{errorList.meta_title}</small>
                          </div>
                          <div className="mb-3">
                            <label htmlFor="exampleFormControlInput22" className="form-label">meta keyword</label>
                            <input name="meta_keyword" onChange={handleInput} value={productInput.meta_keywords}
                            type="text" className="form-control" id="exampleFormControlInput22" placeholder="name" />
                          </div>
                          <div className="mb-3">
                            <label htmlFor="exampleFormControlTextarea33" className="form-label">meta Description</label>
                            <textarea name="meta_description" onChange={handleInput} value={productInput.meta_description}
                            className="form-control" id="exampleFormControlTextarea33" rows="3"></textarea>
                          </div>

                      </div>
                      <div className="tab-pane fade cart-body border p-4" id="contact" role="tabpanel" aria-labelledby="contact-tab">
                             <div className="row ">
                                          
                                    <div className="mb-3 col-md-4">
                                        <label htmlFor="exampleFormControlInput111" className="form-label">selling price</label>
                                        <input name="selling_price" onChange={handleInput} value={productInput.selling_price}
                                        type="text" className="form-control" id="exampleFormControlInput111" placeholder="slug" />
                                      <small className="text-danger">{errorList.selling_price}</small>
                                      </div>
                                      <div className="mb-3 col-md-4" >
                                        <label htmlFor="exampleFormControlInput222" className="form-label">original price</label>
                                        <input name="original_price" onChange={handleInput} value={productInput.original_price}
                                        type="text" className="form-control" id="exampleFormControlInput222" placeholder="name" />
                                      <small className="text-danger">{errorList.original_price}</small>
                                      </div>

                                      <div className="mb-3 col-md-4">
                                        <label htmlFor="exampleFormControlInput333" className="form-label">quantity</label>
                                        <input name="quantity" onChange={handleInput} value={productInput.quantity}
                                        type="text" className="form-control" id="exampleFormControlInput333" placeholder="slug" />
                                      <small className="text-danger">{errorList.quantity}</small>
                                      </div>
                                      <div className="mb-3 col-md-4">
                                        <label htmlFor="exampleFormControlInput444" className="form-label">brand</label>
                                        <input name="brand" onChange={handleInput} value={productInput.brand}
                                        type="text" className="form-control" id="exampleFormControlInput444" placeholder="name" />
                                      </div>

                                      <div className="mb-3 col-md-8">
                                        <label htmlFor="formFile" className="form-label">image</label>
                                        <input name="image" onChange={handleImage} 
                                        className="form-control" type="file" id="formFile" />
                                      </div>
                                      <div className="form-check col-md-4">
                                        <input name="feature" onChange={handleInput} value={productInput.feature}
                                        className="form-check-input" type="checkbox" 
                                        id="flexCheckDefault"/>
                                        <label className="form-check-label" htmlFor="flexCheckDefault">
                                          featured
                                        </label>
                                      </div>
                                      <div className="form-check col-md-4">
                                        <input name="popular" onChange={handleInput} value={productInput.popular}
                                         className="form-check-input" type="checkbox"  
                                        id="flexCheckChecked"  />
                                        <label className="form-check-label" htmlFor="flexCheckChecked">
                                          popular
                                        </label>
                                      </div>

                                      <div className="form-check col-md-4">
                                        <input name="status" onChange={handleInput} value={productInput.status}
                                        className="form-check-input" type="checkbox" 
                                        id="flexCheckChecked3"  />
                                        <label className="form-check-label" htmlFor="flexCheckChecked3">
                                          status
                                        </label>
                                      </div>
                                    

                             </div>
                      </div>
                </div>

                <button className="btn btn-primary px-4 mt-2">Submit</button>

                </form>
                
            </div>
          </div>

    </div>
    

  );
};

export default Addproduct;
