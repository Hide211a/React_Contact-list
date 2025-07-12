import './ContactItem.scss'
import { Link } from "react-router"
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { FiPhone } from "react-icons/fi";
import { IoShareOutline } from "react-icons/io5";
import { useState } from "react";
import { useSelector , useDispatch } from "react-redux";
import { deleteContact , toggleFavorite} from "../../redux/action";
import Modal from "../Modal/Modal";


export default function ContactItem() {

  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [showCallModal, setShowCallModal] = useState(false);
  const [contactToCall, setContactToCall] = useState(null);
  const [showShareModal, setShowShareModal] = useState(false);
  const [contactToShare, setContactToShare] = useState(null);

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

  const handleCallClick = (e, contact) => {
    e.stopPropagation();
    setContactToCall(contact);
    setShowCallModal(true);
  };

  const handleConfirmCall = () => {
    if (contactToCall) {
      window.open(`tel:${contactToCall.phone}`, '_self');
    }
    setShowCallModal(false);
    setContactToCall(null);
  };

  const handleCancelCall = () => {
    setShowCallModal(false);
    setContactToCall(null);
  };

  const handleShareClick = (e, contact) => {
    e.stopPropagation();
    setContactToShare(contact);
    setShowShareModal(true);
  };

  const handleCancelShare = () => {
    setShowShareModal(false);
    setContactToShare(null);
  };

  const generateVCard = (contact) => {
    let vCard = `BEGIN:VCARD
VERSION:3.0
FN:${contact.firstName} ${contact.lastName}
N:${contact.lastName};${contact.firstName};;;
TEL:${contact.phone}
EMAIL:${contact.email}`;

    if (contact.viber) {
      vCard += `\nTEL;TYPE=CELL:${contact.viber}`;
    }
    if (contact.telegram) {
      vCard += `\nX-SOCIALPROFILE;TYPE=telegram:${contact.telegram}`;
    }
    if (contact.birthday) {
      vCard += `\nBDAY:${contact.birthday}`;
    }
    if (contact.address) {
      vCard += `\nADR:;;${contact.address};;;;`;
    }
    if (contact.notes) {
      vCard += `\nNOTE:${contact.notes}`;
    }

    vCard += `\nEND:VCARD`;
    return vCard;
  };

  const shareAsVCard = () => {
    if (contactToShare) {
      const vCard = generateVCard(contactToShare);
      const blob = new Blob([vCard], { type: 'text/vcard' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${contactToShare.firstName}_${contactToShare.lastName}.vcf`;
      link.click();
      URL.revokeObjectURL(url);
      setShowShareModal(false);
      setContactToShare(null);
    }
  };

  const shareAsText = () => {
    if (contactToShare) {
      let text = `Контакт: ${contactToShare.firstName} ${contactToShare.lastName}
Телефон: ${contactToShare.phone}
Email: ${contactToShare.email}
Статус: ${contactToShare.status}`;

      if (contactToShare.viber) {
        text += `\nViber: ${contactToShare.viber}`;
      }
      if (contactToShare.telegram) {
        text += `\nTelegram: ${contactToShare.telegram}`;
      }
      if (contactToShare.birthday) {
        text += `\nДень народження: ${new Date(contactToShare.birthday).toLocaleDateString('uk-UA')}`;
      }
      if (contactToShare.address) {
        text += `\nАдреса: ${contactToShare.address}`;
      }
      if (contactToShare.notes) {
        text += `\nНотатки: ${contactToShare.notes}`;
      }
      
      if (navigator.share) {
        navigator.share({
          title: `Контакт: ${contactToShare.firstName} ${contactToShare.lastName}`,
          text: text
        });
      } else {
        navigator.clipboard.writeText(text).then(() => {
          alert('Контакт скопійовано в буфер обміну!');
        });
      }
      setShowShareModal(false);
      setContactToShare(null);
    }
  };

  const copyToClipboard = () => {
    if (contactToShare) {
      let text = `${contactToShare.firstName} ${contactToShare.lastName}
${contactToShare.phone}
${contactToShare.email}`;

      if (contactToShare.viber) {
        text += `\nViber: ${contactToShare.viber}`;
      }
      if (contactToShare.telegram) {
        text += `\nTelegram: ${contactToShare.telegram}`;
      }
      if (contactToShare.birthday) {
        text += `\nДень народження: ${new Date(contactToShare.birthday).toLocaleDateString('uk-UA')}`;
      }
      if (contactToShare.address) {
        text += `\nАдреса: ${contactToShare.address}`;
      }
      if (contactToShare.notes) {
        text += `\nНотатки: ${contactToShare.notes}`;
      }
      
      navigator.clipboard.writeText(text).then(() => {
        alert('Контакт скопійовано в буфер обміну!');
      });
      setShowShareModal(false);
      setContactToShare(null);
    }
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
              <button 
                className="btn btn-link p-0 me-2" 
                onClick={(e) => handleCallClick(e, contact)}
                title="Подзвонити"
              >
                <FiPhone size={'30px'} color="green"/>
              </button>
              <button 
                className="btn btn-link p-0 me-2" 
                onClick={(e) => handleShareClick(e, contact)}
                title="Поділитися"
              >
                <IoShareOutline size={'30px'} color="blue"/>
              </button>
              <Link to={`/edit-contact/${contact.id}`}><FaRegEdit size={'30px'} color="yellow"/></Link>
              <MdDeleteForever style={{cursor: 'pointer'}} size={'30px'} color="red" onClick={() => handleDeleteClick(contact.id)}/>
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
              
              {selectedContact.viber && (
                <li><span className="contact-info-label">Viber:</span> {selectedContact.viber}</li>
              )}
              {selectedContact.telegram && (
                <li><span className="contact-info-label">Telegram:</span> {selectedContact.telegram}</li>
              )}
              {selectedContact.birthday && (
                <li><span className="contact-info-label">День народження:</span> {new Date(selectedContact.birthday).toLocaleDateString('uk-UA')}</li>
              )}
              {selectedContact.address && (
                <li><span className="contact-info-label">Адреса:</span> {selectedContact.address}</li>
              )}
              {selectedContact.notes && (
                <li><span className="contact-info-label">Нотатки:</span> {selectedContact.notes}</li>
              )}
            </ul>
            <div className="contact-info-actions">
              <button 
                className="btn btn-success contact-info-call" 
                onClick={() => {
                  setContactToCall(selectedContact);
                  setShowInfoModal(false);
                  setShowCallModal(true);
                }}
              >
                <FiPhone className="me-2" />
                Подзвонити
              </button>
              <button 
                className="btn btn-info contact-info-share" 
                onClick={() => {
                  setContactToShare(selectedContact);
                  setShowInfoModal(false);
                  setShowShareModal(true);
                }}
              >
                <IoShareOutline className="me-2" />
                Поділитися
              </button>
              <button className="btn btn-primary contact-info-close" onClick={handleCloseInfoModal}>Закрити</button>
            </div>
          </div>
        </Modal>
      )}
      {showCallModal && contactToCall && (
        <Modal>
          <div className="modal-ios-content call-modal">
            <div className="call-modal-avatar-wrap">
              <img 
                className="call-modal-avatar" 
                src={`https://randomuser.me/api/portraits/${contactToCall.gender}/${contactToCall.avatar}.jpg`} 
                alt="avatar" 
              />
            </div>
            <h2 className="call-modal-title">Подзвонити?</h2>
            <p className="call-modal-contact-name">
              {contactToCall.firstName} {contactToCall.lastName}
            </p>
            <p className="call-modal-phone">{contactToCall.phone}</p>
            <div className="call-modal-buttons">
              <button className="btn btn-secondary" onClick={handleCancelCall}>
                Скасувати
              </button>
              <button className="btn btn-success" onClick={handleConfirmCall}>
                <FiPhone className="me-2" />
                Подзвонити
              </button>
            </div>
          </div>
        </Modal>
      )}
      {showShareModal && contactToShare && (
        <Modal>
          <div className="modal-ios-content share-modal">
            <div className="share-modal-avatar-wrap">
              <img 
                className="share-modal-avatar" 
                src={`https://randomuser.me/api/portraits/${contactToShare.gender}/${contactToShare.avatar}.jpg`} 
                alt="avatar" 
              />
            </div>
            <h2 className="share-modal-title">Поділитися контактом</h2>
            <p className="share-modal-contact-name">
              {contactToShare.firstName} {contactToShare.lastName}
            </p>
            <p className="share-modal-phone">{contactToShare.phone}</p>
            <p className="share-modal-email">{contactToShare.email}</p>
            
            <div className="share-modal-options">
              <button className="share-option-btn" onClick={shareAsVCard}>
                <div className="share-option-icon">📄</div>
                <div className="share-option-text">
                  <div className="share-option-title">vCard файл</div>
                  <div className="share-option-desc">Завантажити .vcf файл</div>
                </div>
              </button>
              
              <button className="share-option-btn" onClick={shareAsText}>
                <div className="share-option-icon">📱</div>
                <div className="share-option-text">
                  <div className="share-option-title">Поділитися</div>
                  <div className="share-option-desc">Через системне меню</div>
                </div>
              </button>
              
              <button className="share-option-btn" onClick={copyToClipboard}>
                <div className="share-option-icon">📋</div>
                <div className="share-option-text">
                  <div className="share-option-title">Копіювати</div>
                  <div className="share-option-desc">В буфер обміну</div>
                </div>
              </button>
            </div>
            
            <button className="btn btn-secondary share-modal-cancel" onClick={handleCancelShare}>
              Скасувати
            </button>
          </div>
        </Modal>
      )}
    </div>
  )
}