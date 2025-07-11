import ReactDOM from "react-dom";
import './Modal.scss';

export default function Modal({ children }) {
  return ReactDOM.createPortal(
    <div className="modal-ios-overlay">
      {children}
    </div>,
    document.body
  );
} 