import React, { useEffect } from "react";
import Footer from "./Footer";
import Header from "./Header";
import { useState } from "react";
import { getProducts } from "./services/productService";
import Spinner from "./Spinner";
import useFetch from "./services/useEffect";
import {useParams} from "react-router-dom";
import PageNotFound from "./PageNotFound";
import {Link } from "react-router-dom";



export default function Products() {
  const [size, setSize]= useState("");
  const {category} = useParams();
  
  const { data: products, loading, error } = useFetch(
    "products?category=" + category
  );


   function renderProduct(p) {
     return (
       <div key={p.id} className="product">
       <Link to = {`/${category}/${p.id}`}>
           <img src={`/images/${p.image}`} alt={p.name} />
           <h3>{p.name}</h3>
           <p>${p.price}</p>
         </Link>
       </div>
     );
   }
   const filteredproducts = size ? products.filter(f => f.skus.find(fin => fin.size === parseInt(size))): products;

   if (error) throw error;
   if (loading) return <Spinner/>;
   if(products.length === 0) return <PageNotFound/>;
  return (
    <>
         
            {size && <h2>{filteredproducts.length } items found </h2>}
          </section>
          <section id = "products">{filteredproducts.map(renderProduct)}</section>
     </>
  );
}
