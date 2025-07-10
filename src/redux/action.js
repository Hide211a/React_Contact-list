import { ADD_CONTACT, DELETE_CONTACT, EDIT_CONTACT, SEARCH_CONTACTS, FILTER_BY_STATUS } from "./type"

export const deleteContact = (id) => {
    return {
        type: DELETE_CONTACT,
        payload: id
    }
}

export const editContact = (id, updateContact) => {
    return {
        type: EDIT_CONTACT,
        payload: {id, updateContact}
    }
}

export const addContact = (newContact) => {
    return {
        type: ADD_CONTACT,
        payload: newContact
    }
}

export const searchContacts = (searchTerm) => {
    return {
        type: SEARCH_CONTACTS,
        payload: searchTerm
    }
}

export const filterByStatus = (status) => {
    return {
        type: FILTER_BY_STATUS,
        payload: status
    }
}

export const clearAllFilters = () => {
    return {
        type: 'CLEAR_ALL_FILTERS'
    }
} 