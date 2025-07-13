import './ContactItem.scss'
import { Link } from "react-router"
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { FiPhone } from "react-icons/fi";
import { IoShareOutline } from "react-icons/io5";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { useState } from "react";
import { useSelector , useDispatch } from "react-redux";
import { deleteContact , toggleFavorite, clearAllFilters } from "../../redux/action";
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
  const [sortKey, setSortKey] = useState('firstName');
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc' | 'desc'

  const contacts = useSelector(state => state.contacts)
  const search = useSelector(state => state.search)
  const statusFilter = useSelector(state => state.statusFilter)
  const contactStatuss = useSelector(state => state.contactStatuss)
  const favoriteOnly = useSelector(state => state.favoriteOnly)
  const dispatch = useDispatch()

  let filteredContacts = contacts;
  

  // Додаю функцію для підсвічування знайденого тексту
  function highlightText(text, search) {
    if (!search) return text;
    const regex = new RegExp(`(${search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    return String(text).split(regex).map((part, i) =>
      regex.test(part) ? <mark key={i}>{part}</mark> : part
    );
  }

  if (search) {
    filteredContacts = filteredContacts.filter(contact => {
      const fields = [
        contact.firstName,
        contact.lastName,
        contact.email,
        contact.phone,
        contact.viber,
        contact.telegram,
        contact.birthday,
        contact.address,
        contact.notes
        // статус і гендер не враховуємо у пошуку
      ];
      return fields.some(field => field && String(field).toLowerCase().includes(search.toLowerCase()));
    });
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

  if (favoriteOnly) {
    filteredContacts = filteredContacts.filter(contact => contact.favorite);
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

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortOrder('asc');
    }
  };

  // Сортування
  const compare = (a, b) => {
    let valA = a[sortKey];
    let valB = b[sortKey];
    // Для улюблених - true/false
    if (sortKey === 'favorite') {
      valA = a.favorite ? 1 : 0;
      valB = b.favorite ? 1 : 0;
    }
    // Для статусу/статі - привести до рядка
    if (typeof valA === 'string') valA = valA.toLowerCase();
    if (typeof valB === 'string') valB = valB.toLowerCase();
    if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
    if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  };
  filteredContacts = [...filteredContacts].sort(compare);

  return(
    <div>
      {/* Desktop Table View */}
      <div className="d-none d-lg-block">
        {filteredContacts.length === 0 ? (
          <div className="empty-state text-center py-5">
            <div style={{fontSize: '3.5rem', marginBottom: 16}}>🔍</div>
            <h4 className="mb-3">Нічого не знайдено</h4>
            <p className="mb-4">Спробуйте змінити запит або скинути фільтри.</p>
            <button className="btn btn-outline-primary" onClick={() => dispatch(clearAllFilters())}>Скинути фільтри</button>
          </div>
        ) : (
          <table className="table">
            <thead>
              <tr className="align-middle text-center fs-5 position-sticky top-0">
                <th className="text-primary" scope="col">icon</th>
                <th className="text-primary" scope="col" style={{cursor:'pointer'}} onClick={() => handleSort('firstName')}>
                  Name {sortKey === 'firstName' && (sortOrder === 'asc' ? '↑' : '↓')}
                </th>
                <th className="text-primary" scope="col" style={{cursor:'pointer'}} onClick={() => handleSort('phone')}>
                  Phone/Email {sortKey === 'phone' && (sortOrder === 'asc' ? '↑' : '↓')}
                </th>
                <th className="text-primary" scope="col" style={{cursor:'pointer'}} onClick={() => handleSort('status')}>
                  Status {sortKey === 'status' && (sortOrder === 'asc' ? '↑' : '↓')}
                </th>
                <th className="text-primary" scope="col" style={{cursor:'pointer'}} onClick={() => handleSort('gender')}>
                  Gender {sortKey === 'gender' && (sortOrder === 'asc' ? '↑' : '↓')}
                </th>
                <th className="text-primary" scope="col" style={{cursor:'pointer'}} onClick={() => handleSort('favorite')}>
                  Edit/Del {sortKey === 'favorite' && (sortOrder === 'asc' ? '↑' : '↓')}
                </th>
              </tr>
            </thead>
            <tbody>
            {filteredContacts.map(contact => (
                <tr key={contact.id} className="align-middle text-center" style={{cursor:'pointer'}} onClick={(e) => handleRowClick(contact, e)}>
                <td className='position-relative' scope="row">
                  <img className={`rounded-circle border border-3 ${contact.gender === 'women' ? 'border-danger' : 'border-primary' }`} src={`https://randomuser.me/api/portraits/${contact.gender}/${contact.avatar}.jpg`} alt="" />

                  <button className="favoriteBtn" onClick={(e) => handleFavoriteClick(e, contact.id)}>
                    {contact.favorite ? (
                      <span className="fav-emoji" role="img" aria-label="favorite">❤️</span>
                    ) : (
                      <span className="fav-emoji" role="img" aria-label="not favorite">🤍</span>
                    )}
                  </button>

                </td>
                <td className="fs-4">{highlightText(contact.firstName, search)}<br/>{highlightText(contact.lastName, search)}</td>
                <td className="fs-5">{highlightText(contact.phone, search)}<br/>{highlightText(contact.email, search)}</td>
                <td className="fs-5 text-uppercase fw-bold">{highlightText(contact.status, search)}</td>
                <td className="fs-5 text-uppercase fw-bold">{highlightText(contact.gender, search)}</td>
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
        )}
      </div>

      {/* Mobile Card View */}
      <div className="d-block d-lg-none">
        {filteredContacts.length === 0 ? (
          <div className="empty-state text-center py-5">
            <div style={{fontSize: '3.5rem', marginBottom: 16}}>🔍</div>
            <h4 className="mb-3">Нічого не знайдено</h4>
            <p className="mb-4">Спробуйте змінити запит або скинути фільтри.</p>
            <button className="btn btn-outline-primary" onClick={() => dispatch(clearAllFilters())}>Скинути фільтри</button>
          </div>
        ) : (
          <div className="row g-3">
            {filteredContacts.map(contact => (
              <div key={contact.id} className="col-12">
                <div className="contact-card" onClick={(e) => handleRowClick(contact, e)}>
                  <div className="contact-card-header">
                    <div className="contact-card-avatar">
                      <img 
                        className={`rounded-circle border border-3 ${contact.gender === 'women' ? 'border-danger' : 'border-primary'}`} 
                        src={`https://randomuser.me/api/portraits/${contact.gender}/${contact.avatar}.jpg`} 
                        alt="" 
                      />
                      <button 
                        className="contact-card-favorite" 
                        onClick={(e) => handleFavoriteClick(e, contact.id)}
                      >
                        {contact.favorite ? '♥' : '♡'}
                      </button>
                    </div>
                    <div className="contact-card-info">
                      <h5 className="contact-card-name">{highlightText(contact.firstName, search)} {highlightText(contact.lastName, search)}</h5>
                      <p className="contact-card-phone">{highlightText(contact.phone, search)}</p>
                      <p className="contact-card-email">{highlightText(contact.email, search)}</p>
                      <div className="contact-card-status">
                        <span className="badge bg-primary">{highlightText(contact.status, search)}</span>
                        <span className="badge bg-secondary ms-2">{highlightText(contact.gender, search)}</span>
                      </div>
                    </div>
                  </div>
                  <div className="contact-card-actions">
                    <button 
                      className="btn btn-sm btn-success me-2" 
                      onClick={(e) => handleCallClick(e, contact)}
                      title="Подзвонити"
                    >
                      <FiPhone size={'16px'} />
                    </button>
                    <button 
                      className="btn btn-sm btn-info me-2" 
                      onClick={(e) => handleShareClick(e, contact)}
                      title="Поділитися"
                    >
                      <IoShareOutline size={'16px'} />
                    </button>
                    <Link to={`/edit-contact/${contact.id}`} className="btn btn-sm btn-warning me-2">
                      <FaRegEdit size={'16px'} />
                    </Link>
                    <button 
                      className="btn btn-sm btn-danger" 
                      onClick={() => handleDeleteClick(contact.id)}
                      title="Видалити"
                    >
                      <MdDeleteForever size={'16px'} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
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