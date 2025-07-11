import ReactDOM from "react-dom";

export default function Modal({ children }) {
  return ReactDOM.createPortal(
    <div style={{
      position: 'fixed',
      top: 0, left: 0, width: '100vw', height: '100vh',
      background: 'rgba(0,0,0,0.4)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 9999
    }}>
      {children}
    </div>,
    document.body
  );
} 