import * as Yup from 'yup'

export const contactValidationSchema = Yup.object().shape({
    firstName: Yup.string().required('First Name is required').min(2, 'Min 2 symbols').max(16, 'Max 16 symbols'),
    lastName: Yup.string().required('Last Name is required').min(2, 'Min 2 symbols').max(16, 'Max 16 symbols'),
    phone: Yup.string().required('Phone is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    avatar: Yup.string().required('Avatar is required'),
    gender: Yup.string().oneOf(['men','women'], 'Invalid gender').required('Gender is required'),
    status: Yup.string().oneOf(['work','family', 'private', 'friends', 'others'], 'Invalid status').required('Status is required'),
    favorite: Yup.boolean()
})