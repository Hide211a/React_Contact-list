import './ContactList.scss';
import ContactItem from "../../components/ContactItem/ContactItem"
import Sidebar from "../../components/Sidebar/Sidebar"

export default function ContactList({ stor, deleteContact }) {
    return(
        <div className="main-page-flex">
            <aside className="main-page-sidebar">
                <Sidebar/>
            </aside>
            <section className="main-page-content">
                <ContactItem stor={stor} deleteContact={deleteContact}/>
            </section>
        </div>
    )
}