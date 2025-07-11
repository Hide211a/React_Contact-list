import { ADD_CONTACT, 
          DELETE_CONTACT, 
          EDIT_CONTACT, 
          SEARCH_CONTACTS,
          FILTER_BY_STATUS, 
          CLEAR_ALL_FILTERS,
          TOGGLE_FAVORITE,
          ADD_STATUS,
          DELETE_STATUS
        } 
      from "./type"

const loadStatusesFromStorage = () => {
  try {
    const savedStatuses = localStorage.getItem('contactStatuses');
    if (savedStatuses) {
      return JSON.parse(savedStatuses);
    }
  } catch (error) {
    console.error('Error loading statuses from localStorage:', error);
  }
  return null;
};


const saveStatusesToStorage = (statuses) => {
  try {
    localStorage.setItem('contactStatuses', JSON.stringify(statuses));
  } catch (error) {
    console.error('Error saving statuses to localStorage:', error);
  }
};


const updateContactStatusStats = (contacts, existingStats = null) => {
  const stats = existingStats ? { ...existingStats } : {
    work: {count: 0, bg: '#F39F5A'},
    family: {count: 0, bg: '#AE445A'},
    friends: {count: 0, bg: '#662549'},
    private: {count: 0, bg: '#451952'},
    other: {count: 0, bg: '#008170'}
  };


  Object.keys(stats).forEach(status => {
    stats[status].count = 0;
  });

  contacts.forEach(contact => {
    if (stats[contact.status]) {
      stats[contact.status].count += 1;
    } else {

      stats[contact.status] = { count: 1, bg: '#6c757d' };
    }
  });

  return stats;
};


const savedStatuses = loadStatusesFromStorage();

const initialState = {
    contacts: [
        {
          id: "1a2b3c4d-0001-4a2f-89d3-bb11a111a111",
          firstName: "Anna",
          lastName: "Ivanova",
          phone: "+380631234567",
          email: "anna.ivanova@gmail.com",
          avatar: 1,
          gender: "women",
          status: "family",
          favorite: false,
        },
        {
          id: "1a2b3c4d-0002-4a2f-89d3-bb11a111a112",
          firstName: "Dmytro",
          lastName: "Kozlov",
          phone: "+380991122334",
          email: "d.kozlov@example.com",
          avatar: 2,
          gender: "men",
          status: "work",
          favorite: true,
        },
        {
          id: "1a2b3c4d-0003-4a2f-89d3-bb11a111a113",
          firstName: "Olena",
          lastName: "Petrova",
          phone: "+380671234321",
          email: "elena.pet@gmail.com",
          avatar: 3,
          gender: "women",
          status: "work",
          favorite: false,
        },
        {
          id: "1a2b3c4d-0004-4a2f-89d3-bb11a111a114",
          firstName: "Serhii",
          lastName: "Mykhailov",
          phone: "+380503210987",
          email: "s.mykhailov@gmail.com",
          avatar: 4,
          gender: "men",
          status: "family",
          favorite: true,
        },
        {
          id: "1a2b3c4d-0005-4a2f-89d3-bb11a111a115",
          firstName: "Iryna",
          lastName: "Bielova",
          phone: "+380632345678",
          email: "iryna.belova@gmail.com",
          avatar: 5,
          gender: "women",
          status: "family",
          favorite: false,
        },
        {
          id: "1a2b3c4d-0006-4a2f-89d3-bb11a111a116",
          firstName: "Oleksii",
          lastName: "Voronov",
          phone: "+380972221122",
          email: "a.voronov@gmail.com",
          avatar: 6,
          gender: "men",
          status: "work",
          favorite: true,
        },
        {
          id: "1a2b3c4d-0007-4a2f-89d3-bb11a111a117",
          firstName: "Maria",
          lastName: "Sydorova",
          phone: "+380682223344",
          email: "maria.syd@gmail.com",
          avatar: 7,
          gender: "women",
          status: "private",
          favorite: false,
        },
        {
          id: "1a2b3c4d-0008-4a2f-89d3-bb11a111a118",
          firstName: "Mykola",
          lastName: "Lebid",
          phone: "+380503456789",
          email: "mykola.lebid@gmail.com",
          avatar: 8,
          gender: "men",
          status: "work",
          favorite: true,
        },
        {
          id: "1a2b3c4d-0009-4a2f-89d3-bb11a111a119",
          firstName: "Olha",
          lastName: "Mykolaieva",
          phone: "+380633210987",
          email: "olha.mykolaieva@gmail.com",
          avatar: 9,
          gender: "women",
          status: "private",
          favorite: false,
        },
        {
          id: "1a2b3c4d-0010-4a2f-89d3-bb11a111a120",
          firstName: "Yurii",
          lastName: "Smirnov",
          phone: "+380672345432",
          email: "yurii.smirnov@gmail.com",
          avatar: 10,
          gender: "men",
          status: "work",
          favorite: true,
        },
      ],
      search: '',
      statusFilter: '',
      contactStatuss: savedStatuses || updateContactStatusStats([
        {
          id: "1a2b3c4d-0001-4a2f-89d3-bb11a111a111",
          firstName: "Anna",
          lastName: "Ivanova",
          phone: "+380631234567",
          email: "anna.ivanova@gmail.com",
          avatar: 1,
          gender: "women",
          status: "family",
          favorite: false,
        },
        {
          id: "1a2b3c4d-0002-4a2f-89d3-bb11a111a112",
          firstName: "Dmytro",
          lastName: "Kozlov",
          phone: "+380991122334",
          email: "d.kozlov@example.com",
          avatar: 2,
          gender: "men",
          status: "work",
          favorite: true,
        },
        {
          id: "1a2b3c4d-0003-4a2f-89d3-bb11a111a113",
          firstName: "Olena",
          lastName: "Petrova",
          phone: "+380671234321",
          email: "elena.pet@gmail.com",
          avatar: 3,
          gender: "women",
          status: "work",
          favorite: false,
        },
        {
          id: "1a2b3c4d-0004-4a2f-89d3-bb11a111a114",
          firstName: "Serhii",
          lastName: "Mykhailov",
          phone: "+380503210987",
          email: "s.mykhailov@gmail.com",
          avatar: 4,
          gender: "men",
          status: "family",
          favorite: true,
        },
        {
          id: "1a2b3c4d-0005-4a2f-89d3-bb11a111a115",
          firstName: "Iryna",
          lastName: "Bielova",
          phone: "+380632345678",
          email: "iryna.belova@gmail.com",
          avatar: 5,
          gender: "women",
          status: "family",
          favorite: false,
        },
        {
          id: "1a2b3c4d-0006-4a2f-89d3-bb11a111a116",
          firstName: "Oleksii",
          lastName: "Voronov",
          phone: "+380972221122",
          email: "a.voronov@gmail.com",
          avatar: 6,
          gender: "men",
          status: "work",
          favorite: true,
        },
        {
          id: "1a2b3c4d-0007-4a2f-89d3-bb11a111a117",
          firstName: "Maria",
          lastName: "Sydorova",
          phone: "+380682223344",
          email: "maria.syd@gmail.com",
          avatar: 7,
          gender: "women",
          status: "private",
          favorite: false,
        },
        {
          id: "1a2b3c4d-0008-4a2f-89d3-bb11a111a118",
          firstName: "Mykola",
          lastName: "Lebid",
          phone: "+380503456789",
          email: "mykola.lebid@gmail.com",
          avatar: 8,
          gender: "men",
          status: "work",
          favorite: true,
        },
        {
          id: "1a2b3c4d-0009-4a2f-89d3-bb11a111a119",
          firstName: "Olha",
          lastName: "Mykolaieva",
          phone: "+380633210987",
          email: "olha.mykolaieva@gmail.com",
          avatar: 9,
          gender: "women",
          status: "private",
          favorite: false,
        },
        {
          id: "1a2b3c4d-0010-4a2f-89d3-bb11a111a120",
          firstName: "Yurii",
          lastName: "Smirnov",
          phone: "+380672345432",
          email: "yurii.smirnov@gmail.com",
          avatar: 10,
          gender: "men",
          status: "work",
          favorite: true,
        },
      ])
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_CONTACT:
            const newContactsAfterAdd = [...state.contacts, action.payload];
            const updatedStatsAfterAdd = updateContactStatusStats(newContactsAfterAdd, state.contactStatuss);
            saveStatusesToStorage(updatedStatsAfterAdd);
            return {
                ...state,
                contacts: newContactsAfterAdd,
                contactStatuss: updatedStatsAfterAdd
            }
        case DELETE_CONTACT:
            const newContactsAfterDelete = state.contacts.filter(contact => contact.id !== action.payload);
            const updatedStatsAfterDelete = updateContactStatusStats(newContactsAfterDelete, state.contactStatuss);
            saveStatusesToStorage(updatedStatsAfterDelete);
            return {
                ...state,
                contacts: newContactsAfterDelete,
                contactStatuss: updatedStatsAfterDelete
            }
        case EDIT_CONTACT:
            const newContactsAfterEdit = state.contacts.map(contact => {
                if (contact.id === action.payload.id) {
                    return {
                        ...contact,
                        ...action.payload.updateContact
                    }
                }
                return contact;
            });
            const updatedStatsAfterEdit = updateContactStatusStats(newContactsAfterEdit);
            saveStatusesToStorage(updatedStatsAfterEdit);
            return {
                ...state,
                contacts: newContactsAfterEdit,
                contactStatuss: updatedStatsAfterEdit
            }
        case SEARCH_CONTACTS:
            return {
                ...state,
                search: action.payload
            }
        case FILTER_BY_STATUS:
            return {
                ...state,
                statusFilter: action.payload
            }
        case CLEAR_ALL_FILTERS:
            return {
                ...state,
                search: '',
                statusFilter: ''
            }
        case TOGGLE_FAVORITE:
            const newContactsAfterToggle = state.contacts.map(contact => {
                if (contact.id === action.payload) {
                    return {...contact, favorite: !contact.favorite}
                }
                return contact;
            });
            return {
                ...state,
                contacts: newContactsAfterToggle
            }
        case ADD_STATUS:
            const newStatusesAfterAdd = {
                ...state.contactStatuss,
                [action.payload.status]: {
                    count: 0,
                    bg: action.payload.bgColor
                }
            };
            saveStatusesToStorage(newStatusesAfterAdd);
            return {
                ...state,
                contactStatuss: newStatusesAfterAdd
            }
        case DELETE_STATUS:
            const newContactStatuss = { ...state.contactStatuss };
            delete newContactStatuss[action.payload];
            

            const updatedContacts = state.contacts.map(contact => {
                if (contact.status === action.payload) {
                    return { ...contact, status: 'other' };
                }
                return contact;
            });
            
            const updatedStats = updateContactStatusStats(updatedContacts);
            
            saveStatusesToStorage(updatedStats);
            
            return {
                ...state,
                contacts: updatedContacts,
                contactStatuss: updatedStats
            }
        default:
            return state;
    }
}

export default reducer;