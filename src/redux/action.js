import { ADD_CONTACT, 
        DELETE_CONTACT, 
        EDIT_CONTACT, 
        SEARCH_CONTACTS, 
        FILTER_BY_STATUS,
        TOGGLE_FAVORITE,
        ADD_STATUS,
        DELETE_STATUS,
        EDIT_STATUS }     
    from "./type"

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
 
export const toggleFavorite = (id) => {
    return {
       type : TOGGLE_FAVORITE,
        payload: id
    }
}

export const toggleFavoriteFilter = () => {
    return {
        type: 'TOGGLE_FAVORITE_FILTER'
    }
}

export const addStatus = (status, bgColor) => {
    return {
        type: ADD_STATUS,
        payload: { status, bgColor }
    }
}

export const deleteStatus = (status) => {
    return {
        type: DELETE_STATUS,
        payload: status
    }
}

export const editStatus = (oldStatus, newStatus, newBgColor) => {
    return {
        type: EDIT_STATUS,
        payload: { oldStatus, newStatus, newBgColor }
    }
}