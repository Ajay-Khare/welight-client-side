
const Cart = (prop) => {
    // console.log(data)
    return (
        <>

            <div className="container">
                {/* <!-- Modal --> */}
                <div className="modal fade " id="myModal" role="dialog">
                    <div className="modal-dialog modal-xxl">

                        {/* <!-- Modal content--> */}
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close float-right" data-dismiss="modal">&times;</button>
                                <h4 className="modal-title">Your Cart</h4>
                            </div>
                            <div className="modal-body">
                                {prop.data.map(ele => {
                                    return <p>{ele.product}</p>
                                })}
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


export default Cart;