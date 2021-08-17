import React, { useEffect, useState } from "react";
import "./App.css";
import Footer from "./Footer";
import Header from "./Header";
import {Routes , Route} from "react-router-dom";
import Detail from "./Detail";
import Cart from "./Cart";
import Products from "./Products";

export default function App() {
  
const [cart, setCart] = useState(() => {
  try {
    return JSON.parse(localStorage.getItem("cart")) ?? [];
  } catch {
    console.error("The cart could not be parsed into JSON.");
    return [];
  }
});

useEffect(()=>localStorage.setItem("cart",JSON.stringify(cart)),[cart]);
function addToCart(id, sku){
    setCart((items)=>{
      const itemInCart = items.find((i)=>i.sku === sku);
    
      if(itemInCart){
        //map will return array of items 
      return items.map((i)=>i.sku === sku ? {...i, quantity: i.quantity + 1} : i);   
      }
      else{
        //new array with new item appended 
          return [...items, {id,sku,quantity: 1}];
      }

    })
  }

  function updateQuantity(sku,quantity){
    setCart((items) =>{
      if(quantity === 0){
        //remove i.sku === sku item if quantity is 0.
         return items.filter((i)=>i.sku !== sku);
      }
     
      return items.find((i)=>i.sku === sku ? {...i,quantity} :i)
   
    });
  }

  return (
    <>
      <div className="content">
        <Header />
        <main>
<Routes>
<Route path = "/" element = {<h1>Welcome to this site</h1>} />

<Route path = "/:category" element = {<Products/>} />
<Route path = "/:category/:id"
       element = {<Detail addToCart = {addToCart}/>} />
<Route path = "/cart" element = {<Cart cart = {cart} updateQuantity ={updateQuantity}/>} />

</Routes>
        </main>
      </div>
      <Footer />
    </>
  );
}
