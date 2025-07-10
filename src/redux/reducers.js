import { ADD_CONTACT, DELETE_CONTACT, EDIT_CONTACT, SEARCH_CONTACTS, FILTER_BY_STATUS, CLEAR_ALL_FILTERS } from "./type"

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
      statusFilter: ''
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_CONTACT:
            return {
                ...state,
                contacts: [...state.contacts, action.payload]
            }
        case DELETE_CONTACT:
                return {
                    ...state,
                    contacts: state.contacts.filter(contact => contact.id !== action.payload)
                }
        case EDIT_CONTACT:
            return {
                ...state,
                contacts: state.contacts.map(contact => {
                    if (contact.id === action.payload.id) {
                        return {
                            ...contact,
                            ...action.payload.updateContact
                        }
                    }
                    return contact;
                })
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
        default:
            return state;
    }
}

export default reducer;