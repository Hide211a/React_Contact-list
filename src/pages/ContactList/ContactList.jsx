import ContactItem from "../../components/ContactItem/ContactItem"
import Sidebar from "../../components/Sidebar/Sidebar"

export default function ContactList() {
    return(
        <div className="container rounded bg-white shadow-lg">
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
