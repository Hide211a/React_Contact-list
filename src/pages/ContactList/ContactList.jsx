import ContactItem from "../../components/ContactItem/ContactItem"
import Sidebar from "../../components/Sidebar/Sidebar"


export default function ContactList({ stor, deleteContact }) {
    return(
        <div className="container rounded bg-white shadow-lg">
            <div className="row">
                <div className="col-3">
                    <Sidebar stor={stor}/>
                </div>
                <div className="col-9">
                    <ContactItem stor={stor} deleteContact={deleteContact}/>
                </div>
            </div>
        </div>
    )
}
