import { useSelector, useDispatch } from "react-redux";
import { filterByStatus, clearAllFilters } from "../../redux/action";

export default function Sidebar() {

  const contacts = useSelector(state => state.contacts)
  const search = useSelector(state => state.search)
  const statusFilter = useSelector(state => state.statusFilter)
  const dispatch = useDispatch()

  // Фільтрація контактів за пошуком (як у ContactItem)
  const filteredContacts = search ?
    contacts.filter(contact => `${contact.firstName} ${contact.lastName} ${contact.email} ${contact.phone}`.toLowerCase().includes(search.toLowerCase()))
    : contacts;

  const totalContacts = filteredContacts.length;

  const statusCounts = {
    work: 0,
    family: 0,
    private: 0,
    friends: 0,
    others: 0
  }

  // Рахуємо статистику тільки для відфільтрованих контактів
  filteredContacts.forEach(contact => {
    statusCounts[contact.status] +=1
  });

  const handleStatusClick = (status) => {
    // Якщо статус вже активний, знімаємо фільтр
    if (statusFilter === status) {
      dispatch(filterByStatus(''));
    } else {
      dispatch(filterByStatus(status));
    }
  };

  const clearFilters = () => {
    dispatch(clearAllFilters());
  };

  const getStatusClass = (status) => {
    const baseClass = "d-flex justify-content-between mb-3";
    const isActive = statusFilter === status;
    return `${baseClass} ${isActive ? 'bg-light border border-primary' : ''}`;
  };

  return(
    <aside className="container border-end position-sticky top-0">
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
              <div className={getStatusClass('work')} style={{cursor: 'pointer'}} onClick={() => handleStatusClick('work')}>
                <div className="bg-success">Work</div>
                <span>{statusCounts.work}</span>
              </div>
              <div className={getStatusClass('family')} style={{cursor: 'pointer'}} onClick={() => handleStatusClick('family')}>
                <div className="bg-warning">Family</div>
                <span>{statusCounts.family}</span>
              </div>
              <div className={getStatusClass('friends')} style={{cursor: 'pointer'}} onClick={() => handleStatusClick('friends')}>
                <div className="bg-info">Friends</div>
                <span>{statusCounts.friends}</span>
              </div>
              <div className={getStatusClass('private')} style={{cursor: 'pointer'}} onClick={() => handleStatusClick('private')}>
                <div className="bg-primary">Private</div>
                <span>{statusCounts.private}</span>
              </div>
              <div className={getStatusClass('others')} style={{cursor: 'pointer'}} onClick={() => handleStatusClick('others')}>
                <div className="bg-secondary">Others</div>
                <span>{statusCounts.others}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}