import { useEffect, useState } from "react"
import "./style/homepage.css"
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Cart from "./cart";
const Homepage = () => {
    // data of all products
    const [data, setData] = useState([]);

    // category wise products
    const [catData, setCatData] = useState([]);

    useEffect(() => {
        fetch("https://fakestoreapi.com/products", {
            method: "GET",
            headers: {
                "content-type": "application/json"
            }
        })
            .then(data => data.json())
            .then(res => {
                setData(res)
                setCatData(res)
            })

    }, [])

    // arrey of id's of products which are added in the cart.

    // products added in cart by user, data loaded from database
    const [cartList, setCartList] = useState([])

    const cartHandler = (e) => {
        e.preventDefault()
        fetch("http://localhost:8080/cart", {
            method: "get",
            headers: {
                "accessToken": sessionStorage.getItem("accessToken")
            }
        })
            .then(data => data.json())
            .then(res => {
                setCartList(res);

            })
    }

    const allCat = (e) => {
        let temp = [];
        data.map(ele => {
            temp.push(ele)
        })
        setCatData(temp)

    }

    const menClothing = (e) => {
        let temp = [];
        data.map(ele => {
            if (ele.category === "men's clothing") {
                temp.push(ele)
            }
        })
        setCatData(temp)

    }

    const jwellary = (e) => {
        let temp = [];
        data.map(ele => {
            if (ele.category === "jewelery") {
                temp.push(ele)
            }
        })
        setCatData(temp)
    }

    const electronic = (e) => {
        let temp = [];
        data.map(ele => {
            if (ele.category === "electronics") {
                temp.push(ele)
            }
        })
        setCatData(temp)
    }

    const womenClothing = (e) => {
        let temp = [];
        data.map(ele => {
            if (ele.category === "women's clothing") {
                temp.push(ele)
                return
            }
        })
        setCatData(temp)
    }

    // silgle product name on click on add to cart
    const [cartProduct, setCartProduct] = useState({});

    // to updata button name from "add to cart" to "added to cart"
    const [productAddedInCart, setProductAddedInCart] = useState([]);

    let id;
    const addToCart = (e) => {
        id = e.target.id;
        let product
        data.map(ele => {
            if (ele.id == id) {
                product = ele.title;
            }
        })
        setCartProduct({ product: product });
        setProductAddedInCart([...productAddedInCart,product]);
        console.log(productAddedInCart);
    }

    useEffect(() => {

        setProductAddedInCart([...productAddedInCart, cartProduct.product]);

        fetch("http://localhost:8080/cart", {
            method: "post",
            headers: {
                "content-type": "application/json",
                "accessToken": sessionStorage.getItem("accessToken")
            },
            body: JSON.stringify(cartProduct)
        })
            .then(data => data.json())
            .then(res => {
                console.log(res.message)
                if (res.message === "User Is not Loged In") {
                    toast.error("User not Registered", { position: toast.POSITION.TOP_CENTER })
                }
                if (res.message === "success") {
                    toast.success("item added to your cart", { position: toast.POSITION.TOP_CENTER })
                }
                if (res.message === "jwt expired" || res.message === "jwt malformed") {
                    toast.error("Please Log In to add products in cart", { position: toast.POSITION.TOP_CENTER })
                }
                if (res.message === "item allready exist in cart"){
                    toast.success("item allready exist in cart", { position: toast.POSITION.TOP_CENTER })

                }
            })
    }, [cartProduct]);

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary sticky-top">
                <div className="container-fluid">
                    <a className="navbar-brand" >E Shopping</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">

                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <button className="nav-link" aria-current="page" onClick={allCat}>All Categories</button>
                            </li>
                            <li className="nav-item">
                                <button className="nav-link" aria-current="page" onClick={menClothing} >men's clothing</button>
                            </li>
                            <li className="nav-item">
                                <button className="nav-link" onClick={jwellary}>jewelery</button>
                            </li>
                            <li className="nav-item">
                                <button className="nav-link" onClick={electronic}>electronic</button>
                            </li>
                            <li className="nav-item">
                                <button className="nav-link" onClick={womenClothing} tabIndex="-1" aria-disabled="true">women's clothing</button>
                            </li>
                        </ul>

                    </div>
                    <form className="d-flex">
                        <button className="btn btn-success" type="submit" data-toggle="modal" data-target="#myModal" onClick={cartHandler}>Cart</button>
                    </form>
                </div>
            </nav>
            <div className="mainContainer">

                <div className="row row-cols-1 row-cols-md-4 g-4">
                    {catData.map((ele, i) => {
                        return (
                            <div className="col" id={ele.id}>
                                <div className="card h-100">
                                    <img src={ele.image} className="card-img-top" alt="..." />
                                    <div className="card-body">
                                        <h5 className="card-title">{ele.title} </h5>
                                        <div>
                                            <p className="price">price {ele.price} $ </p>
                                            <p className="rating">rating {ele.rating.rate}/5 </p>
                                        </div>

                                        {(productAddedInCart.some(element => element == ele.title))
                                            ? <button className="btn btn-primary disabled" id={ele.id}>Added to cart</button>
                                            : <button className="btn btn-primary" id={ele.id} onClick={addToCart}>Add to cart</button>
                                        }

                                        {/* {
                                            (cartProduct.product == ele.title)
                                                ? <button className="btn btn-primary disabled" id={ele.id}>Added to cart</button>
                                                : <button className="btn btn-primary" id={ele.id} onClick={addToCart}>Add to cart</button>
                                        } */}

                                        <p className="card-text">{ele.description}</p>
                                    </div>
                                </div>
                            </div>
                        )
                    })}

                </div>
            </div>
            <ToastContainer />
            <Cart data={cartList} />
        </>
    )
}

export default Homepage