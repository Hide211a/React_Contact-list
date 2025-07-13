import { useState } from "react";
import ContactItem from "../../components/ContactItem/ContactItem"
import Sidebar from "../../components/Sidebar/Sidebar"
import './ContactList.scss';

export default function ContactList() {
    const [showSidebar, setShowSidebar] = useState(false);

    return(
        <div className="container-fluid contactlist-ios">
            <div className="row">
                {/* Desktop Sidebar */}
                <div className="col-lg-3 d-none d-lg-block">
                    <Sidebar/>
                </div>
                
                {/* Mobile Sidebar Toggle */}
                <div className="d-lg-none mb-3">
                    <button 
                        className="btn btn-primary w-100" 
                        onClick={() => setShowSidebar(!showSidebar)}
                    >
                        {showSidebar ? 'Сховати фільтри' : 'Показати фільтри'}
                    </button>
                </div>
                
                {/* Mobile Sidebar */}
                {showSidebar && (
                    <div className="col-12 d-lg-none mb-3">
                        <Sidebar/>
                    </div>
                )}
                
                {/* Contact List */}
                <div className="col-lg-9 col-12">
                    <ContactItem/>
                </div>
            </div>
        </div>
    )
}
