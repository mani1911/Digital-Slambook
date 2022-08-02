import React from "react";
import sc from './spinner.module.css';
const Spinner = ()=>{
    return <div className={sc.bod}>
        <div className={sc.loader}></div>
    </div>
}

export default Spinner;