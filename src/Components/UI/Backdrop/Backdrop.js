import React from "react";
import styles from './Backdrop.css'

const Backdrop = props => 
    <div 
        className="Backdrop" 
        onClick={props.onClick}
    ></div>

    export default Backdrop