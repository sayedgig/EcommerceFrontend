import axios from 'axios';
import React, { useState } from 'react';
import swal from 'sweetalert';

const AddCategory = () => {

    const [catewgoryInput, setCatewgory] = useState({
        slug : '', 
        name : '', 
        description : '', 
        status : '', 
        meta_title : '', 
        meta_keyword : '', 
        meta_description : '', 
        error_list:[],
        diplay_errors:[],
    });

    const handleInput = (e) => {
        e.persist();
        setCatewgory({ ...catewgoryInput ,
            [e.target.name]:e.target.value,
        });
    }

    const handleCategory = (e)  => {
        e.preventDefault();
        const data = { 
            slug : catewgoryInput.slug, 
            name : catewgoryInput.name, 
            description : catewgoryInput.description, 
            status : catewgoryInput.status == true ? '1':'0' , 
            meta_title : catewgoryInput.meta_title, 
            meta_keyword : catewgoryInput.meta_keyword, 
            meta_description : catewgoryInput.description, 
        }

        axios.post('/api/store-category',data).then(res=> {
            if(res.data.status===200){
                swal("success",res.data.message,"success");
                document.getElementById("category_form").reset();

            }else if(res.data.status===400){
                setCatewgory({ ...catewgoryInput , error_list : res.data.errors});
            }
        });

        //var diplay_errors = []; 
        if(catewgoryInput.error_list){
            catewgoryInput.diplay_errors = [
                catewgoryInput.error_list.name,
                catewgoryInput.error_list.slug,
                catewgoryInput.error_list.meta_title,
            ];
        }
    }
  return (
  <div className="container-fluid px-4">
      <h1 className="mt-4">add Category</h1>

        {
            catewgoryInput.diplay_errors.map((item,ind) =>{
                return (
                    <p className="mb-1 text-danger" key={ind}>{item}</p>
                );
            })
        }
      <form onSubmit={handleCategory} id ="category_form">

    

                <ul className="nav nav-tabs" id="myTab" role="tablist">
                <li className="nav-item" role="presentation">
                    <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Home</button>
                </li>
                <li className="nav-item" role="presentation">
                    <button className="nav-link" id="seo-tags-tab" data-bs-toggle="tab" data-bs-target="#seo-tags" type="button" role="tab" aria-controls="seo-tags" aria-selected="false">seo-tags</button>
                </li>
                
                </ul>
                <div className="tab-content" id="myTabContent">
                <div className="tab-pane fade show active card-body border" id="home" role="tabpanel" aria-labelledby="home-tab">
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlInput1" className="form-label">Slug</label>
                        <input type="text" name="slug" onChange={handleInput} value ={catewgoryInput.slug} 
                        className="form-control" id="exampleFormControlInput1" placeholder="slug" />
                        <span>{catewgoryInput.error_list.slug}</span>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlInput1" className="form-label">name</label>
                        <input type="text" name ="name" onChange={handleInput} value ={catewgoryInput.name} 
                        className="form-control" id="exampleFormControlInput1" placeholder="name" />
                        <span>{catewgoryInput.error_list.name}</span>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlTextarea1" name="description" onChange={handleInput} value ={catewgoryInput.description}
                        className="form-label">Description</label>
                        <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" ></textarea>
                    </div>
                    <div className="form-check">
                    <input className="form-check-input" name="status" onChange={handleInput} value ={catewgoryInput.status}
                     type="checkbox" value="" id="flexCheckDefault" />
                    <label className="form-check-label" htmlFor="flexCheckDefault">
                        Status (0 shown 1 hide)
                    </label>
                    </div>
                    
                </div>
                <div className="tab-pane fade card-body border" id="seo-tags" role="tabpanel" aria-labelledby="seo-tags-tab">
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlInput1" className="form-label">Meta Ttile</label>
                        <input type="text" name="meta_title" onChange={handleInput} value ={catewgoryInput.meta_title} 
                        className="form-control"  id="exampleFormControlInput1" placeholder="Meta Ttile" />
                        <span>{catewgoryInput.error_list.meta_title}</span>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlInput1" className="form-label">Meta keywords</label>
                        <input type="text" name="meta_keyword" onChange={handleInput} value ={catewgoryInput.meta_keyword}
                        className="form-control" id="exampleFormControlInput1" placeholder="Meta keywords<" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlInput1" className="form-label">Meta Description</label>
                        <input type="text" name="meta_description" onChange={handleInput} value ={catewgoryInput.meta_description}
                        className="form-control" id="exampleFormControlInput1" placeholder="Meta Description" />
                    </div>
                </div>

                <button type="submit" className="btn btn-primary px-4 float-end">submit</button>
        
                </div>

        </form>

  </div>


  );
};

export default AddCategory;
