import { Link } from "react-router";
import './Header.scss';

export default function Header() {
    return(
        <header className="header-ua">
            <nav className="header-ua__navbar">
                <div className="header-ua__brand">
                    <Link className="header-ua__link" to="/">
                        Контакт-лист
                    </Link>
                    <Link className="header-ua__link" to="/add-contact">
                        Додати контакт
                    </Link>
                </div>
                <form className="header-ua__search" role="search">
                    <input className="header-ua__input" type="search" placeholder="Пошук" aria-label="Пошук"/>
                    <button className="header-ua__btn" type="submit">Знайти</button>
                </form>
            </nav>
        </header>
    )
}