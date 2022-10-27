import React, { useState } from "react";
import upperCircle from "./images/Ellipse-31.png";
import lowerCircle from "./images/Ellipse-32.png";
import dots from "./images/Group-695.png";
import { useNavigate, Link } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import "./style/register.css"

const RegisterPage = () => {
    const navigate = useNavigate()
    const [match, setMatch] = useState(false)
    const [length, setLength] = useState(false)
    const [registered, setRegistered] = useState(false)
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        cinfpassword: ""
    })

    if (match === true) {
        if (data.password === data.cinfpassword) {
            setMatch(false)
        }
    }

    const submitForm = (e) => {
        e.preventDefault()
        if (data.password !== data.cinfpassword) {
            return setMatch(true)
        } else {
            if (length) {
                return
            }
            fetch('http://localhost:8080/register', {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name:data.name,
                    email: data.email,
                    password: data.password
                })
            }).then(res => res.json()).then(data => {

                if (data.message === 'user allready registered') {
                    setRegistered(true)
                    return toast.error("User is already registered. Please log in.", { position: toast.POSITION.BOTTOM_CENTER })
                }
                toast("Registered Successfully", { position: toast.POSITION.BOTTOM_CENTER })
                navigate('/')

            })
        }
    }
    if (data.password.length >= 1 && length !== true) {
        if (data.password.length < 6 || data.password.length === "") {
            setLength(!length)
        }

    }
    if (length) {
        if (data.password.length >= 6) {
            setLength(false)
        }
    }
    if (data.password === "" && length === true) {
        setLength(false)
    }
    if (match) {
        var styleObj = {
            borderColor: "tomato"
        }

    }


    return (
        <>
            <div className="containers">
                <img className="upperCornerCircle" src={upperCircle} alt="" />
                <div className="main-regi">
                    <div className="leftContainer">
                        <img src={dots} alt="" />
                    </div>
                    <div className="middleContainer">
                        <h1 className="logo">Fill Details to Sign Up</h1>
                        <form onSubmit={(e) => submitForm(e)} className="loginForm" action="">
                            <input type="text" name="name" id="name" value={data.name} onChange={(e) => setData({ ...data, [e.target.name]: e.target.value })} placeholder="Your Name" />
                            <input type="email" name="email" id="email" value={data.email} onChange={(e) => setData({ ...data, [e.target.name]: e.target.value })} className="user-id" placeholder="Mail ID" required />
                            <br />
                            <div style={{ position: "relative" }} >
                                <input type="password" style={styleObj} name="password" value={data.password} onChange={(e) => setData({ ...data, [e.target.name]: e.target.value })} className="password" placeholder="Password" required />
                                {
                                    length && <span style={{ position: "absolute", top: 35, right: 10, fontSize: "11px", color: 'tomato' }} >Password too weak minimum length(6)</span>
                                }
                            </div>
                            <div style={{ position: "relative" }} >
                                <input type="password" style={styleObj} name="cinfpassword" value={data.cinfpassword} onChange={(e) => setData({ ...data, [e.target.name]: e.target.value })} className="password" placeholder="Confirm Password" required />
                                {match && <span style={{ position: "absolute", right: 13, top: 38, fontSize: "12px", color: "tomato" }}>Password not match</span>}
                            </div>

                            <button style={{ cursor: "pointer" }}>Sign Up</button>

                        </form>
                        {
                            registered && <div>
                                <br />
                                <p style={{ color: "grey" }}>or</p>

                                <Link style={{ color: "#7D8CC4" }} to="/" >Sign in</Link>
                            </div>
                        }
                    </div>
                    <div className="rightContainer">
                        <img src={dots} alt="" />
                    </div>
                </div>
                <img className="lowerCornerCircle" src={lowerCircle} alt="" />
            </div>
            <ToastContainer />
        </>
    )
}

export default RegisterPage;