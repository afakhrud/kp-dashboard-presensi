import React, { useEffect } from 'react'
import { IoCloseCircleSharp } from "react-icons/io5";
import './Modal.css';

function Modal(props) {
    return (
        <div className='modal-overlay'>
            <div className='modal card-wrapper'>
                <div className='modal-header'>
                    <h4>{props.title}</h4>
                    <IoCloseCircleSharp onClick={props.click} className='close-handle' size={30} />
                </div>
                <main className='modal-body'>
                    {props.children}
                </main>
            </div>
        </div>
    )
}

export default Modal

