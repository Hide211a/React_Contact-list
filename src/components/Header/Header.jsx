import { Link } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { searchContacts, clearAllFilters, toggleFavoriteFilter } from "../../redux/action";
import './Header.scss';
import { MdList, MdPersonAdd, MdSearch } from 'react-icons/md';

export default function Header() {
    const dispatch = useDispatch();
    const favoriteOnly = useSelector(state => state.favoriteOnly);

    const handleSearch = (e) => {
        const value = e.target.value;
        if (value === '') {
            dispatch(clearAllFilters());
        } else {
            dispatch(searchContacts(value));
        }
    };

    const handleFavoriteOnly = () => {
        dispatch(toggleFavoriteFilter());
    };

    return(
        <header className="container-fluid header-ios mb-3 mt-3">
            <div className="row">
                <div className="col-12">
                    <nav className="navbar bg-body-tertiary">
                        <div className="container-fluid">
                            {/* Desktop Navigation */}
                            <div className="navbar-brand d-none d-md-flex">
                                <Link className="navbar-brand me-4" to="/">
                                    <MdList style={{verticalAlign: 'middle', marginRight: 8, fontSize: '1.2em'}} />
                                    Contact List
                                </Link>
                                <Link className="navbar-brand" to="/add-contact">
                                    <MdPersonAdd style={{verticalAlign: 'middle', marginRight: 8, fontSize: '1.2em'}} />
                                    Add Contact
                                </Link>
                            </div>

                            {/* Mobile Navigation */}
                            <div className="d-flex d-md-none flex-column w-100">
                                <div className="d-flex justify-content-between align-items-center mb-2">
                                    <Link className="navbar-brand" to="/">
                                        <MdList style={{verticalAlign: 'middle', marginRight: 8, fontSize: '1.1em'}} />
                                        Contact List
                                    </Link>
                                    <Link className="btn btn-primary btn-sm" to="/add-contact">
                                        <MdPersonAdd style={{verticalAlign: 'middle', marginRight: 4, fontSize: '1em'}} />
                                        Add
                                    </Link>
                                </div>
                                <form className="d-flex align-items-center search-form-ios" role="search">
                                    <span className="search-icon-ios"><MdSearch style={{fontSize: '1.2em'}} /></span>
                                    <input onInput={handleSearch} className="form-control" type="search" placeholder="Search contacts..." aria-label="Search"/>
                                </form>
                                <label className="favorite-only-check mt-2 ms-1" htmlFor="favoriteOnlyMobile">
                                    <input
                                        type="checkbox"
                                        id="favoriteOnlyMobile"
                                        checked={favoriteOnly}
                                        onChange={handleFavoriteOnly}
                                        className="heart-checkbox-input"
                                        aria-label="Тільки улюблені"
                                    />
                                    <span className="heart-checkbox" aria-hidden="true">
                                        <svg viewBox="0 0 24 24" width="22" height="22">
                                            <path d="M12 21s-5.2-4.6-7.2-6.7C2.1 12.5 1 10.7 1 8.8 1 5.9 3.4 3.5 6.3 3.5c1.5 0 2.9.7 3.7 1.9C11.8 4.2 13.2 3.5 14.7 3.5c2.9 0 5.3 2.4 5.3 5.3 0 1.9-1.1 3.7-3.8 5.5C17.2 16.4 12 21 12 21z"/>
                                        </svg>
                                    </span>
                                    <span className="favorite-label">Тільки улюблені</span>
                                </label>
                            </div>

                            {/* Desktop Search */}
                            <form className="d-none d-md-flex align-items-center search-form-ios" role="search">
                                <span className="search-icon-ios"><MdSearch style={{fontSize: '1.3em'}} /></span>
                                <input onInput={handleSearch} className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                            </form>
                            <label className="favorite-only-check ms-3 d-none d-md-flex" htmlFor="favoriteOnly">
                                <input
                                    type="checkbox"
                                    id="favoriteOnly"
                                    checked={favoriteOnly}
                                    onChange={handleFavoriteOnly}
                                    className="heart-checkbox-input"
                                    aria-label="Тільки улюблені"
                                />
                                <span className="heart-checkbox" aria-hidden="true">
                                    <svg viewBox="0 0 24 24" width="22" height="22">
                                        <path d="M12 21s-5.2-4.6-7.2-6.7C2.1 12.5 1 10.7 1 8.8 1 5.9 3.4 3.5 6.3 3.5c1.5 0 2.9.7 3.7 1.9C11.8 4.2 13.2 3.5 14.7 3.5c2.9 0 5.3 2.4 5.3 5.3 0 1.9-1.1 3.7-3.8 5.5C17.2 16.4 12 21 12 21z"/>
                                    </svg>
                                </span>
                                <span className="favorite-label">Тільки улюблені</span>
                            </label>
                        </div>
                    </nav>
                </div>
            </div>
        </header>
    )
}