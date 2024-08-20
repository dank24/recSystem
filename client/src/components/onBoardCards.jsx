import React, { useState } from "react";

import '../assets/styles.css'

const OnBoardCard = (props) =>{


    const styles = {
        backgroundColor: [props.color]
    }

    return(
        <div style={styles} id="onBoardCardMainCont" onClick={e =>{
            props.handleClick(props.name)}}>
                <div>
                    <img src={props.img}  width='20%'/>
                    <h2>{props.name}</h2>
                </div>

                <div>
                    <div id="loveDiv">Love It</div>
                    <div id="hateDiv">Hate It</div>
                    <div id="MehDiv">it was okay</div>
                    <div id="neverDiv">Never Saw It</div>
                </div>

        </div>
    )
}

export default OnBoardCard