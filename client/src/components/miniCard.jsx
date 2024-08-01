import React from "react";
import { useState, useEffect } from "react";

import '../assets/styles.css'


function MiniCard(props) {

    const [state, setState] = useState(0)

//FUnctions


    return(
        <div id="miniCMainCont">

            <div id="miniCFirstDiv">
                <img src={props.poster} />
                <div id="pDiv"><p>{props.title}</p></div>
            </div>


        </div>
    )
}

export default MiniCard