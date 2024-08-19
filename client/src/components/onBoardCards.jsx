import React, { useState } from "react";

import '../assets/styles.css'

const OnBoardCard = (props) =>{


    const styles = {
        backgroundColor: [props.color]
    }

    return(
        <div style={styles} id="onBoardCardMainCont" onClick={e =>{
            props.handleClick(props.name)}}>
            <h2>{props.name}</h2>
            <img src={props.img}  width='20%'/>
        </div>
    )
}

export default OnBoardCard