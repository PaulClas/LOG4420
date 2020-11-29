import '../css/App.css';
import home from "../img/home.png";
import {Header} from "../_Common/Header.js"
import {Footer} from "../_Common/Footer.js"
import { useState, useEffect } from 'react';
import {Link} from "react-router-dom"


export function HomeComponent() {
    document.title="OnlineShop - Accueil";
    const [cartItemsLength, setCartItems] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const item = await fetch("http://localhost:4000/api/shopping-cart", {credentials: 'include' });
                if(item.ok) {
                    const orderItems = await item.json();
                    let sumItems=0;
                    let result=0;
                    orderItems.forEach(element => {
                        sumItems+=element.quantity;
                        });
                    result=sumItems;
                    setCartItems(result);
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
            <Header currentActive="home" cartCount={cartItemsLength}/>
            <main>
                <article>
                    <img alt="home" src={home} id="home-img"/>
                    <h1>Le site n&deg;1 pour les achats en ligne!</h1>
                    <p>Découvrez nos différents produits au meilleur prix.</p>
                    <Link className="btn" to="/products">En savoir plus <i className="fa fa-angle-double-right"></i></Link>
                </article>
            </main>
            <Footer/>
        </div>
    );
}
