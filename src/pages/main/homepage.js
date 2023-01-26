import React from "react";
import "./homepage.css";

import { useNavigate} from 'react-router-dom';
import {useState} from 'react';
import Footer from '../../components/bottombar';


function Homepage() {

    let navigate = useNavigate();
    const [error,setError] = useState("");

    return(
        <div className="main-container">
            {/* <div>
                <img className="logo" src={MyImage} alt="Heart" height={400} width={450}></img>
            </div> */}
            <div>
                
                {(error !== "") ? <div className="error">{error}</div> : ""}
                <button type="submit" className="button1"  onClick={() =>{navigate(`/ext`)}}>
                    Start test
                </button>
            </div>
        <Footer/>
        </div>
    )
}

export default Homepage
