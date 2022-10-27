import { useEffect, useState } from "react"
import "./style/homepage.css"
const Homepage = () => {
    const [data, setData] = useState([]);
    const [catData, setCatData] = useState([]);
    useEffect(() => {
        fetch("https://fakestoreapi.com/products?limit=50", {
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

    const addToCart= (e) => {
        console.log(e.target.id)
    }


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
                        <button className="btn btn-success" type="submit">Cart</button>
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
                                        <button className="btn btn-primary" id={ele.id} onClick={addToCart}>Add to cart</button>
                                        <p className="card-text">{ele.description}</p>
                                    </div>
                                </div>
                            </div>
                        )
                    })}

                </div>
            </div>

        </>
    )
}

export default Homepage