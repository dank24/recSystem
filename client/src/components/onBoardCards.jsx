import React, { useState } from "react";

import '../assets/styles.css'

const OnBoardCard = (props) =>{

    const styles = {
        backgroundColor: [props.color],
        border: props.click == true ? '' : ''
    }

    return(
        <div  id="onBoardCardMainCont" onClick={ e =>{
            props.handleClick(e, props.imdbID, props.click)
        }} >
                <div id="onBoardCardFirstDiv">
                    <img src={props.img}  width='20%'/>
                </div>

                <div id="onBoardCardSecondDiv">
                    <h2>{props.name}</h2>
                    <p onClick={props.pColors} id="goodP">Good</p>
                    <p onClick={props.pColors} id="mehP">Meh</p>
                    <p style={props.imdbID == props.styles.id ? props.styles.nP : styles } id="neverP">Never Saw</p>
                </div>

        </div>
    )
}

export default OnBoardCard