import React, {useState} from "react";
import modal from './Modal.module.css';

const Modal = (props)=>{
    const [modal, setModal] = useState(false);
    const toggleModal = ()=>{
        setModal(mode => !mode);
    }
    return <div className={modal.modal}>
        <div className={modal.overlay}>
            <div className={modal.content}>
                <h2>
                    Modal
                </h2>
                <p>
                    Test text
                </p>
                <button className={modal.close} onClick = {toggleModal}>Close</button>
            </div>
        </div>
    </div>
}
export default Modal;