import React from "react";
import modal from './Modal.module.css';
import ReactDOM  from 'react-dom';

const Modal = (props)=>{   
    if(!props.open) return null; 
    console.log('Modal Open')
    const toggleModal = ()=>{
        props.toggleModal(false);
        return null;
    }
    return ReactDOM.createPortal(<div className={modal.overlay} onClick = {toggleModal}>
        <div className={modal.modal}>
            <div className={modal.content}>
                <p>
                    {props.message}
                </p>
                <button className={modal.close} onClick = {toggleModal}>Close</button>
            </div>
        </div>
    </div>,document.getElementById('portal'))
}
export default Modal;