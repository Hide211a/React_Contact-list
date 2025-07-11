import { Link } from 'react-router';
import { useState, useEffect } from 'react';
import './NotFound.css';

export default function NotFound() {
    const originalText = "ПООМИЛКА: СТОРІНКУ НЕ ЗНАЙДЕНО";
    const [text, setText] = useState('');
    const [showLink, setShowLink] = useState(false);

    useEffect(() => {
        let index = 0;
        setText(''); 
        
        const typingInterval = setInterval(() => {
            if (index < originalText.length) {
                setText((prev) => prev + originalText.charAt(index));
                index++;
            } else {
                clearInterval(typingInterval);
                setShowLink(true); 
            }
        }, 120); 

        return () => clearInterval(typingInterval); 
    }, []);

    return (
        <div className="not-found-container">
            <h1 className="not-found-title" data-text="404">404</h1>
            <p className="not-found-text">{text}</p>
            {showLink && (
                 <Link to="/" className="not-found-link">ПОВЕРНУТИСЯ НА ГОЛОВНУ</Link>
            )}
        </div>
    );
}