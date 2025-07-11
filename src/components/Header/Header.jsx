import { Link } from "react-router";
import { useDispatch } from "react-redux";
import { searchContacts, clearAllFilters } from "../../redux/action";
import './Header.scss';
import { MdList, MdPersonAdd, MdSearch } from 'react-icons/md';

export default function Header() {
    const dispatch = useDispatch();

    const handleSearch = (e) => {
        const value = e.target.value;
        if (value === '') {
            dispatch(clearAllFilters());
        } else {
            dispatch(searchContacts(value));
        }
    };

    return(
        <header className="container-fluid header-ios mb-3 mt-3">
            <div className="row">
                <div className="col-12">
                    <nav className="navbar bg-body-tertiary ">
                        <div className="container-fluid">
                           <div className="navbar-brand">
                            <Link className="navbar-brand" to="/">
                                <MdList style={{verticalAlign: 'middle', marginRight: 8, fontSize: '1.2em'}} />
                                Contact List
                            </Link>
                            <Link className="navbar-brand" to="/add-contact">
                               <MdPersonAdd style={{verticalAlign: 'middle', marginRight: 8, fontSize: '1.2em'}} />
                               Add Contact
                            </Link>
                           </div>

                            <form className="d-flex align-items-center search-form-ios" role="search">
                                <span className="search-icon-ios"><MdSearch style={{fontSize: '1.3em'}} /></span>
                                <input onInput={handleSearch} className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                            </form>
                        </div>
                    </nav>
                </div>
            </div>
        </header>
    )
}