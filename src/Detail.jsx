import React from "react";
import {useNavigate, useParams} from "react-router-dom";
import useFetch from "./services/useEffect";
import Spinner from "./Spinner";
import PageNotFound from "./PageNotFound";
import { useState } from "react";

export default function Detail(props)
 {
    const {sku,setSku} = useState("");
     const {id} =useParams();
     const navigate = useNavigate();

const {data: product , loading , error} = useFetch(`products/${id}`);
if(loading) return <Spinner/>;

  if(error) throw error;

  if(!product) return <PageNotFound/>;

  // TODO: Display these products details
  return (
    <div id="detail">
      <h1>{product.name}</h1>
    <p>{product.description}</p>
    <p id="price">${product.price}</p>
            <label htmlFor="size">Filter by Size:</label>{" "}
            <select id="size" value = {sku} onChange = {(e)=>setSku(e.target.value)} >
              <option value="">What sizes ?</option>
             {
               product.skus.map((skus)=>(
               <option key = {skus.sku} value = {skus.sku}>
                 {skus.size}</option>))
             }
            </select>
    <p>
      <button disabled = {!sku} 
      className = "btn btn-primary" 
      onClick={()=>{ 
        navigate("/cart") 
        props.addToCart(id,sku)
      }}> 
        Add to cart
      </button>
    </p>
     <img src={`/images/${product.image}`} alt={product.category} />
   </div>
   );
}
