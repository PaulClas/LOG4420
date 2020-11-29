import '../css/App.css';
import {Header} from "../_Common/Header.js"
import {Footer} from "../_Common/Footer.js"
import {Link} from "react-router-dom"
import { formatPrice } from "../utils.js"
import React, { useEffect, useState } from 'react';

export function OrderComponent() {
    document.title="OnlineShop - Commande";
    const [cartItemsLength, setCartItems] = useState(0);
    
    const [order, setOrder] = useState({
        "id" : 0,
        "firstName" : "",
        "lastName" : "",
        "email" : "",
        "phone" : "",
        "products" : []
    });

    const handleSubmit = (event) => {
      return fetch("http://localhost:4000/api/orders", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(order),
        credentials: 'include'
      });
    }
        
    useEffect(() => {
        const fetchData = async () => {
            try {
                const item = await fetch("http://localhost:4000/api/shopping-cart", {credentials: 'include'});
                if(item.ok) {
                    const items = await item.json();
                    let sumItems=0;
                    let result=0;
                    items.forEach(element => {
                        sumItems+=element.quantity;
                        });
                    result=sumItems;
                    setCartItems(result);
                    setOrder({"products" : items.map(item => {
                        return {
                          id: item.productId,
                          quantity: item.quantity
                        }
                      })});
                } else {
                    throw item.json();
                }
            } catch(e) {
                console.error(e);
            }
        }
        fetchData();
    }, []);
    return (
        <div>
            <Header cartCount={cartItemsLength}/>
            <main>
                <article>
                  <h1>Commande</h1>
                  <form id="order-form" action="/confirmation" method="get" onSubmit={handleSubmit}>
                    <section>
                      <h2>Contact</h2>
                      <div className="row">
                        <div className="col">
                          <div className="form-group">
                            <label htmlFor="firstName">Prénom</label>
                            <input className="form-control" type="text" id="firstName" name="firstName" placeholder="Prénom" minLength="2" onChange={e => setOrder({[e.target.name] : e.target.value})} required/>
                          </div>
                        </div>
                        <div className="col">
                          <div className="form-group">
                            <label htmlFor="lastName">Nom</label>
                            <input className="form-control" type="text" id="lastName" name="lastName" placeholder="Nom" minLength="2" onChange={e => setOrder({[e.target.name] : e.target.value})} required/>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col">
                          <div className="form-group">
                            <label htmlFor="email">Adresse courriel</label>
                            <input className="form-control" type="email" id="email" name="email" placeholder="Adresse courriel" onChange={e => setOrder({[e.target.name] : e.target.value})} required/>
                          </div>
                        </div>
                        <div className="col">
                          <div className="form-group">
                            <label htmlFor="phone">Téléphone</label>
                            <input className="form-control" type="tel" id="phone" name="phone" placeholder="###-###-####" onChange={e => setOrder({[e.target.name] : e.target.value})} required/>
                          </div>
                        </div>
                      </div>
                    </section>
                    <section>
                      <h2>Paiement</h2>
                      <div className="row">
                        <div className="col">
                          <div className="form-group">
                            <label htmlFor="credit-card">Numéro de carte de crédit</label>
                            <input className="form-control" type="text" id="credit-card" name="credit-card" placeholder="•••• •••• •••• ••••" onChange={e => setOrder({[e.target.name] : e.target.value})} required
                                   />
                          </div>
                        </div>
                        <div className="col">
                          <div className="form-group">
                            <label htmlFor="credit-card-expiry">Expiration (mm/aa)</label>
                            <input className="form-control" type="text" id="credit-card-expiry" name="credit-card-expiry" placeholder="mm/aa" onChange={e => setOrder({[e.target.name] : e.target.value})} required
                                   pattern="^(0[1-9]|1[0-2])\/?([0-9]{2})"/>
                          </div>
                        </div>
                      </div>
                    </section>
                    <button className="btn pull-right" type="submit">Payer <i className="fa fa-angle-double-right"></i></button>
                  </form>
                </article>
              </main>
            <Footer/>
        </div>
    );
}