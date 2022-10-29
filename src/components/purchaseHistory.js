

const PurchaseHistory = (prop) => {
    return (
        <>

            <div className="container">
                {/* <!-- Modal --> */}
                <div className="modal fade " id="myModal" role="dialog">
                    <div className="modal-dialog modal-xxl">

                        {/* <!-- Modal content--> */}
                        <div className="modal-content">
                            <div className="modal-header bg-primary">
                                <h4 className="modal-title">Your purchase History</h4>
                            </div>
                            <div className="modal-body">
                                {
                                    (prop.history.length === 0)
                                        ? <p>You Haven't Purchesed Anything Yet, Start Shopping</p>
                                        : prop.history.map((ele,i) => {
                                            return (
                                                <>
                                                    <p>{ i+1}. {ele.product}</p>
                                                    <p><span>Quantity : {ele.quantity}</span> , <span>price : { ele.price } $</span></p>
                                                    
                                                </>
                                            )
                                        })

                                }
                                {/* <p>Grand Total : {amount.toFixed(2)} $</p> */}
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                            </div>
                        </div>

                    </div>
                </div>

            </div>

        </>
    )
}

export default PurchaseHistory;