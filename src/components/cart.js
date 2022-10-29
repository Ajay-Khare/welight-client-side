import { useState } from "react";

const Cart = (prop) => {
    // console.log(data)
    const [totalAmount, setTotalAmount] = useState();
    let amount = 0;
    prop.data.cartList.map(ele => {
        amount += ele.price * ele.quantity
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

        fetch("http://localhost:8080/quantity", {
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

    return (
        <>

            <div className="container">
                {/* <!-- Modal --> */}
                <div className="modal fade " id="myModal" role="dialog">
                    <div className="modal-dialog modal-xxl">

                        {/* <!-- Modal content--> */}
                        <div className="modal-content">
                            <div className="modal-header bg-primary">
                                {/* <button type="button" className="close" data-dismiss="modal">&times;</button> */}
                                <h4 className="modal-title">Your Cart</h4>
                            </div>
                            <div className="modal-body">
                                {
                                    prop.data.cartList.map(ele => {
                                        
                                    return (
                                        <>
                                            {/* {setTotalAmount(totalAmount + ele.price)} */}
                                            <p>{ele.product}</p>
                                            <span>Quantity :
                                                <button className="btn btn-sm btn-light btn-padding-y-0" type="button" id={ele._id} onClick={quantityHandler}>-</button>
                                                <span>{ele.quantity} </span>
                                                <button className="btn btn-default btn-sm" type="button" id={ele._id} onClick={quantityHandler}>+</button>
                                                <br />
                                                <span>Price per Unit : {ele.price} $</span>
                                                <br />
                                                <span>Sub Totle : {ele.price * ele.quantity} $</span>
                                                <hr />
                                            </span>
                                        </>
                                    )
                                    })
                                }
                                <p>Grand Total : {amount.toFixed(2)}</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-success" >Proceed To Buy</button>
                            </div>
                        </div>

                    </div>
                </div>

            </div>

        </>
    )
}


export default Cart;