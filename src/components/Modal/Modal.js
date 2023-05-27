import {useEffect} from "react";
import { createPortal } from 'react-dom';
import './Modal.css'

const modalRoot = document.querySelector('#root-modal');

export default function Modal({onClose, children}){
       useEffect(()=>{
        window.addEventListener('keydown', handleKeyDown)
     
        return ()=>{
        window.removeEventListener('keydown', handleKeyDown)
       }});
        
const handleKeyDown = event => {
        if (event.code === 'Escape') {
               onClose();
        }}

        const handleBackdropClick = event => {
                if (event.currentTarget === event.target) {
                      onClose();
                    }}
        

       
        return createPortal(  <div class="Overlay" onClick={handleBackdropClick}>
                <div class="Modal">
                {children}
                </div>
              </div>, modalRoot
              ); 
      
}
Modal.defaultProps = {
        children: null,
      };