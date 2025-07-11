import ContactItem from "../../components/ContactItem/ContactItem"
import Sidebar from "../../components/Sidebar/Sidebar"
import './ContactList.scss';

export default function ContactList() {
    return(
        <div className="container-fluid contactlist-ios">
            <div className="row">
                <div className="col-3">
                    <Sidebar/>
                </div>
                <div className="col-9">
                    <ContactItem/>
                </div>
            </div>
        </div>
    )
}
