// import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify'
// import 'react-toastify/dist/ReactToastify.css';

const Cart = (prop) => {

    // to calculate total amonun of product whih are added in cart
    let amount = 0;
    prop.data.cartList.map(ele => {
        return amount += ele.price * ele.quantity
    })

    const quantityHandler = (e) => {
        prop.data.setRefresh(!prop.data.refresh)
        let qty;
        let id = e.target.id;
        if (e.target.innerHTML === "+") {
            qty = true
        }
        else {
            qty = false
        }

        fetch("https://e-shopping-by-ajay.herokuapp.com/quantity", {
            method: "PATCH",
            headers: {
                "content-type": "application/json",
                "accessToken": sessionStorage.getItem("accessToken")
            },
            body: JSON.stringify({ qty, id })
        })
            .then(data => data.json())
            .then(res => {
            })
    }

    // onClick purchase putton
    const purchaseHandler = () => {
        prop.data.setCartProduct([])
        fetch("https://e-shopping-by-ajay.herokuapp.com/purchase", {
            method: "PATCH",
            headers: {
                "accessToken": sessionStorage.getItem("accessToken")
            },
        })
            .then(data => data.json())
            .then(res => {
                if (res.message === "success") {
                    toast.success(`Congratulations You Bought ${prop.data.cartList.length} products at ${amount} $`, { position: toast.POSITION.TOP_CENTER })
                }
            })
    }

    return (
        <>

            <div className="container">
                {/* <!-- Modal --> */}
                <div className="modal fade " id="myModal" role="dialog">
                    <div className="modal-dialog modal-xxl">

                        {/* <!-- Modal content--> */}
                        <div className="modal-content">
                            <div className="modal-header bg-primary">
                                <h4 className="modal-title">Your Cart</h4>
                            </div>
                            <div className="modal-body">
                                {
                                    (prop.data.cartList.length === 0)
                                        ? <p>No Items in Your Cart</p>
                                        : prop.data.cartList.map(ele => {
                                            return (
                                                <>
                                                    <p style={{ fontWeight: 600 }}>{ele.product}</p>
                                                    <span>Quantity :
                                                        <button
                                                            className="btn btn-sm btn-light btn-padding-y-0"
                                                            type="button" id={ele._id}
                                                            onClick={quantityHandler}>
                                                            -
                                                        </button>
                                                        <span>{ele.quantity} </span>
                                                        <button className="btn btn-default btn-sm" type="button" id={ele._id} onClick={quantityHandler}>+</button>
                                                        <br />
                                                        <span>Price per Unit : {ele.price} $</span>
                                                        <br />
                                                        <span style={{ fontWeight: 600 }}>Sub Totle : {ele.price * ele.quantity} $</span>
                                                        <hr />
                                                    </span>
                                                </>
                                            )
                                        })

                                }
                                <p style={{ fontWeight: 600 }}>Grand Total : {amount.toFixed(2)} $</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-success" onClick={purchaseHandler}>Click To pay {amount} $ & Buy {prop.data.cartList.length} items</button>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
            <ToastContainer/>

        </>
    )
}


export default Cart;