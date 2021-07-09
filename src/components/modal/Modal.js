import React, { useState, forwardRef, useImperativeHandle} from 'react'
import './Modal.css'
import ReactDOM from 'react-dom'

const Modal = forwardRef((props,ref) => {
    const [ display, setDisplay ] = useState( false )

    useImperativeHandle(ref, () => {
        return {
            openModal: () => open(),
            closeModal: () => close()
        }
    });

    const open = () => {
        setDisplay(true)
    };

    const close = () => {
        setDisplay(false)
    };

    if(display){

        return ReactDOM.createPortal(
            <div className="modal-wrapper" id="wrap">
                <div className="modal-backdrop" id="backd"/>
                <div className="modal-box" id="box">
                     {props.children}
                </div>
            </div>, document.getElementById("modal-root")
        )
    }
    return null;
});

export default Modal;