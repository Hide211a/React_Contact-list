import './Sidebar.scss';
import { useSelector, useDispatch } from "react-redux";
import { filterByStatus, clearAllFilters, addStatus, deleteStatus, editStatus } from "../../redux/action";
import { useState } from "react";
import Modal from "../Modal/Modal";

export default function Sidebar() {

  const contacts = useSelector(state => state.contacts)
  const search = useSelector(state => state.search)
  const statusFilter = useSelector(state => state.statusFilter)
  const contactStatuss = useSelector(state => state.contactStatuss)
  const dispatch = useDispatch()

  const [showAddStatusModal, setShowAddStatusModal] = useState(false);
  const [showDeleteStatusModal, setShowDeleteStatusModal] = useState(false);
  const [statusToDelete, setStatusToDelete] = useState('');
  const [newStatusName, setNewStatusName] = useState('');
  const [newStatusColor, setNewStatusColor] = useState('#6c757d');
  const [statusError, setStatusError] = useState('');
  const [showEditStatusModal, setShowEditStatusModal] = useState(false);
  const [statusToEdit, setStatusToEdit] = useState('');
  const [editStatusName, setEditStatusName] = useState('');
  const [editStatusColor, setEditStatusColor] = useState('#6c757d');


  const filteredContacts = search ?
    contacts.filter(contact => `${contact.firstName} ${contact.lastName} ${contact.email} ${contact.phone}`.toLowerCase().includes(search.toLowerCase()))
    : contacts;

  const totalContacts = filteredContacts.length;

  const handleStatusClick = (status) => {
    if (statusFilter === status) {
      dispatch(filterByStatus(''));
    } else {
      dispatch(filterByStatus(status));
    }
  };

  const clearFilters = () => {
    dispatch(clearAllFilters());
  };

  const handleAddStatus = () => {
    if (newStatusName.trim()) {
      dispatch(addStatus(newStatusName.trim().toLowerCase(), newStatusColor));
      setNewStatusName('');
      setNewStatusColor('#6c757d');
      setShowAddStatusModal(false);
      setStatusError('');
    } else {
      setStatusError('Назва статусу не може бути порожньою.');
    }
  };

  const handleDeleteStatusClick = (status) => {
    setStatusToDelete(status);
    setShowDeleteStatusModal(true);
  };

  const handleConfirmDeleteStatus = () => {
    dispatch(deleteStatus(statusToDelete));
    setShowDeleteStatusModal(false);
    setStatusToDelete('');
  };

  const handleEditStatusClick = (status) => {
    setStatusToEdit(status);
    setEditStatusName(status);
    setEditStatusColor(contactStatuss[status]?.bg || '#6c757d');
    setShowEditStatusModal(true);
  };

  const getStatusClass = (status) => {
    const baseClass = "d-flex justify-content-between mb-3";
    const isActive = statusFilter === status;
    return `${baseClass} ${isActive ? 'active-status' : ''}`;
  };

  const getStatusStyle = (status) => {
    const statusData = contactStatuss[status];
    return {
      backgroundColor: statusData ? statusData.bg : '#6c757d',
      color: 'white',
      padding: '8px 12px',
      borderRadius: '4px',
      fontWeight: 'bold'
    };
  };

  return(
    <aside className="container position-sticky top-0 sidebar-ios">
      <div className="row">
        <div className="col-12">
          <div className="contacts-labels">
            <div className="fs-3 mb-5 mt-4 d-flex justify-content-between">
              <span>All contacts:</span><span>{totalContacts}</span>
            </div>
            {(search || statusFilter) && (
              <div className="mb-3">
                <button 
                  className="btn btn-outline-secondary btn-sm" 
                  onClick={clearFilters}
                >
                  Clear filters
                </button>
              </div>
            )}
            <div className="list fs-5">
              {Object.keys(contactStatuss).map(status => (
                <div key={status} className={getStatusClass(status)} style={{cursor: 'pointer'}}>
                  <div 
                    style={getStatusStyle(status)} 
                    onClick={() => handleStatusClick(status)}
                    className="flex-grow-1 me-2"
                  >
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </div>
                  <div className="d-flex align-items-center">
                    <span className="me-2">{filteredContacts.filter(contact => contact.status === status).length}</span>
                    {status !== 'other' && (
                      <>
                        <button 
                          className="btn btn-outline-secondary btn-sm me-1"
                          onClick={e => {
                            e.stopPropagation();
                            handleEditStatusClick(status);
                          }}
                          title="Редагувати статус"
                        >
                          <span role="img" aria-label="edit">✏️</span>
                        </button>
                        <button 
                          className="btn btn-outline-danger btn-sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteStatusClick(status);
                          }}
                          title="Видалити статус"
                        >
                          ×
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-3">
              <button 
                className="btn btn-outline-primary btn-sm w-100" 
                onClick={() => setShowAddStatusModal(true)}
              >
                + Add Status
              </button>
            </div>
          </div>
        </div>
      </div>

      {showAddStatusModal && (
        <Modal>
          <div className="modal-ios-content">
            <h4 className="mb-4">Додати новий статус</h4>
            <div className="mb-3">
              <label className="form-label">Назва статусу:</label>
              <input 
                type="text" 
                className={`form-control ${statusError ? 'is-invalid' : ''}`}
                value={newStatusName}
                onChange={(e) => {
                  setNewStatusName(e.target.value);
                  if (statusError) setStatusError('');
                }}
                placeholder="Введіть назву статусу"
              />
              {statusError && (
                <div className="invalid-feedback">
                  {statusError}
                </div>
              )}
            </div>
            <div className="mb-3">
              <label className="form-label">Колір:</label>
              <input 
                type="color" 
                className="form-control" 
                value={newStatusColor}
                onChange={(e) => setNewStatusColor(e.target.value)}
              />
            </div>
            <div style={{display: 'flex', gap: '16px', justifyContent: 'flex-end'}}>
              <button className="btn btn-secondary" onClick={() => {
                setShowAddStatusModal(false);
                setStatusError('');
              }}>Скасувати</button>
              <button className="btn btn-primary" onClick={handleAddStatus}>Додати</button>
            </div>
          </div>
        </Modal>
      )}


      {showDeleteStatusModal && (
        <Modal>
          <div className="modal-ios-content">
            <h4 className="mb-4">Видалити статус?</h4>
            <p>
              Ви дійсно хочете видалити статус "{statusToDelete.charAt(0).toUpperCase() + statusToDelete.slice(1)}"? 
              Всі контакти з цим статусом будуть переміщені в "Other".
            </p>
            <div style={{display: 'flex', gap: '16px', justifyContent: 'flex-end'}}>
              <button className="btn btn-secondary" onClick={() => setShowDeleteStatusModal(false)}>Скасувати</button>
              <button className="btn btn-danger" onClick={handleConfirmDeleteStatus}>Видалити</button>
            </div>
          </div>
        </Modal>
      )}

      {showEditStatusModal && (
        <Modal>
          <div className="modal-ios-content">
            <h4 className="mb-4">Редагувати статус</h4>
            <div className="mb-3">
              <label className="form-label">Назва статусу:</label>
              <input 
                type="text" 
                className={`form-control ${statusError ? 'is-invalid' : ''}`}
                value={editStatusName}
                onChange={e => {
                  setEditStatusName(e.target.value);
                  if (statusError) setStatusError('');
                }}
                placeholder="Введіть нову назву статусу"
              />
              {statusError && (
                <div className="invalid-feedback">
                  {statusError}
                </div>
              )}
            </div>
            <div className="mb-3">
              <label className="form-label">Колір:</label>
              <input 
                type="color" 
                className="form-control" 
                value={editStatusColor}
                onChange={e => setEditStatusColor(e.target.value)}
              />
            </div>
            <div style={{display: 'flex', gap: '16px', justifyContent: 'flex-end'}}>
              <button className="btn btn-secondary" onClick={() => {
                setShowEditStatusModal(false);
                setStatusError('');
              }}>Скасувати</button>
              <button className="btn btn-primary" onClick={() => {
                // Валідація
                const trimmed = editStatusName.trim().toLowerCase();
                if (!trimmed) {
                  setStatusError('Назва статусу не може бути порожньою.');
                  return;
                }
                if (trimmed !== statusToEdit && Object.keys(contactStatuss).includes(trimmed)) {
                  setStatusError('Такий статус вже існує.');
                  return;
                }
                dispatch(editStatus(statusToEdit, trimmed, editStatusColor));
                setShowEditStatusModal(false);
                setStatusError('');
              }}>Зберегти</button>
            </div>
          </div>
        </Modal>
      )}
    </aside>
  )
}