import './ContactItem.scss'
import { Link } from "react-router"
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { useState } from "react";
import { useSelector , useDispatch } from "react-redux";
import { deleteContact , toggleFavorite} from "../../redux/action";
import Modal from "../Modal/Modal";


export default function ContactItem() {

  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);

  const contacts = useSelector(state => state.contacts)
  const search = useSelector(state => state.search)
  const statusFilter = useSelector(state => state.statusFilter)
  const contactStatuss = useSelector(state => state.contactStatuss)
  const dispatch = useDispatch()

  let filteredContacts = contacts;
  

  if (search) {
    filteredContacts = filteredContacts.filter(contact => 
      `${contact.firstName} ${contact.lastName} ${contact.email} ${contact.phone}`.toLowerCase().includes(search.toLowerCase())
    );
  }
  

  if (statusFilter) {
    if (statusFilter === 'other') {
      // Фільтруємо контакти, які не мають стандартних статусів
      const validStatuses = Object.keys(contactStatuss).filter(s => s !== 'other');
      filteredContacts = filteredContacts.filter(contact => 
        !validStatuses.includes(contact.status)
      );
    } else {
      filteredContacts = filteredContacts.filter(contact => contact.status === statusFilter);
    }
  }

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setShowModal(true);
  };

  const handleConfirmDelete = () => {
    dispatch(deleteContact(deleteId));
    setShowModal(false);
    setDeleteId(null);
  };

  const handleCancelDelete = () => {
    setShowModal(false);
    setDeleteId(null);
  };

  const handleRowClick = (contact, e) => {
    if (e.target.closest('a') || e.target.closest('button') || e.target.closest('svg')) return;
    setSelectedContact(contact);
    setShowInfoModal(true);
  };

  const handleFavoriteClick = (e, contactId) => {
    e.stopPropagation(); 
    dispatch(toggleFavorite(contactId));
  };

  const handleCloseInfoModal = () => {
    setShowInfoModal(false);
    setSelectedContact(null);
  };

  return(
    <div>
      <table className="table">
        <thead>
          <tr className="align-middle text-center fs-5 position-sticky top-0">
            <th className="text-primary" scope="col">icon</th>
            <th className="text-primary" scope="col">Name</th>
            <th className="text-primary" scope="col">Phone/Email</th>
            <th className="text-primary" scope="col">Status</th>
            <th className="text-primary" scope="col">Gender</th>
            <th className="text-primary" scope="col">Edit/Del</th>
          </tr>
        </thead>
        <tbody>
        {filteredContacts.map(contact => (
            <tr key={contact.id} className="align-middle text-center" style={{cursor:'pointer'}} onClick={(e) => handleRowClick(contact, e)}>
            <td className='position-relative' scope="row">
              <img className={`rounded-circle border border-3 ${contact.gender === 'women' ? 'border-danger' : 'border-primary' }`} src={`https://randomuser.me/api/portraits/${contact.gender}/${contact.avatar}.jpg`} alt="" />

              <button className="favoriteBtn" onClick={(e) => handleFavoriteClick(e, contact.id)}>
                  {contact.favorite ? '♥' : '♡' }
              </button>

            </td>
            <td className="fs-4">{contact.firstName}<br/>{contact.lastName}</td>
            <td className="fs-5">{contact.phone}<br/>{contact.email}</td>
            <td className="fs-5 text-uppercase fw-bold">{contact.status}</td>
            <td className="fs-5 text-uppercase fw-bold">{contact.gender}</td>
            <td>
              <Link to={`/edit-contact/${contact.id}`}><FaRegEdit size={'50px'} color="yellow"/></Link>
              <MdDeleteForever style={{cursor: 'pointer'}} size={'50px'} color="red" onClick={() => handleDeleteClick(contact.id)}/>
            </td>
          </tr>
        ))}
        </tbody>
      </table>
      {showModal && (
        <Modal>
          <div className="modal-ios-content">
            <h4 className="mb-4">Видалити контакт?</h4>
            <p>Ви дійсно хочете видалити цього контакта? Цю дію не можна скасувати.</p>
            <div style={{display: 'flex', gap: '16px', justifyContent: 'flex-end'}}>
              <button className="btn btn-secondary" onClick={handleCancelDelete}>Скасувати</button>
              <button className="btn btn-danger" onClick={handleConfirmDelete}>Видалити</button>
            </div>
          </div>
        </Modal>
      )}
      {showInfoModal && selectedContact && (
        <Modal>
          <div className="modal-ios-content contact-info-modal">
            <div className="contact-info-avatar-wrap">
              <img className="contact-info-avatar" src={`https://randomuser.me/api/portraits/${selectedContact.gender}/${selectedContact.avatar}.jpg`} alt="avatar" />
            </div>
            <h2 className="contact-info-title">Інформація про контакт</h2>
            <ul className="contact-info-list">
              <li><span className="contact-info-label">Ім'я:</span> {selectedContact.firstName}</li>
              <li><span className="contact-info-label">Прізвище:</span> {selectedContact.lastName}</li>
              <li><span className="contact-info-label">Телефон:</span> {selectedContact.phone}</li>
              <li><span className="contact-info-label">Email:</span> {selectedContact.email}</li>
              <li><span className="contact-info-label">Статус:</span> {selectedContact.status}</li>
              <li><span className="contact-info-label">Стать:</span> {selectedContact.gender}</li>
              <li><span className="contact-info-label">Favorite:</span> {selectedContact.favorite ? 'Yes' : 'No'}</li>
            </ul>
            <button className="btn btn-primary contact-info-close" onClick={handleCloseInfoModal}>Закрити</button>
          </div>
        </Modal>
      )}
    </div>
  )
}