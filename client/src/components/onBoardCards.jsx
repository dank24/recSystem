import React, { useState } from "react";

import '../assets/styles.css'

const OnBoardCard = (props) =>{

    const styles = {
        backgroundColor: [props.color],
        border: props.click == true ? '' : ''
    }

    return(
        <div  id="onBoardCardMainCont" onClick={ e =>{
            props.handleClick(props.name, e, props.imdbID, props.click)
        }} >
                <div id="onBoardCardFirstDiv">
                    <img src={props.img}  width='20%'/>
                </div>

                <div id="onBoardCardSecondDiv">
                    <h2>{props.name}</h2>
                    <p id="goodP">Good</p>
                    <p id="mehP">Meh</p>
                    <p id="neverP">Never Saw</p>
                </div>

        </div>
    )
}

export default OnBoardCard