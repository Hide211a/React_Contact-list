import './AddContact.scss'
import { Formik, Form, Field, ErrorMessage} from 'formik'
import {contactValidationSchema} from '../../validation/validation'
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from '../../redux/action'

export default function AddContact() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const contactStatuss = useSelector(state => state.contactStatuss);

    const initialValues = {
        id: uuidv4(),
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        avatar: '',
        gender: '',
        status: '',
        favorite: false,
        // Додаткові поля
        viber: '',
        telegram: '',
        birthday: '',
        address: '',
        notes: ''
    }

    const handleSubmin = (values) => {
        console.log(values);
        dispatch(addContact(values))
        navigate('/')
    }

    return(
        <div className="container-fluid addcontact-ios">
            <div className="addcontact-form">
                <Formik initialValues={initialValues} validationSchema={contactValidationSchema} onSubmit={handleSubmin}>
                    {({isSubmitting}) => (
                      <Form>
                            <h1 className='text-center'>Add new contact</h1>
                            <hr />
                            <div className='mb-4'>
                                <label htmlFor="firstName">First name</label>
                                <Field className='form-control fs-5' type='text' name='firstName' id='firstName'/>
                                <ErrorMessage name='firstName' component='p' className='text-danger position-absolute'/>
                            </div>
                            <div className='mb-4'>
                                <label htmlFor="lastName">Last name</label>
                                <Field className='form-control fs-5' type='text' name='lastName' id='lastName'/>
                                <ErrorMessage name='lastName' component='p' className='text-danger position-absolute'/>
                            </div>
                            <div className='mb-4'>
                                <label htmlFor="phone">Phone</label>
                                <Field className='form-control fs-5' type='text' name='phone' id='phone'/>
                                <ErrorMessage name='phone' component='p' className='text-danger position-absolute'/>
                            </div>
                            <div className='mb-4'> 
                                <label htmlFor="email">Email</label>
                                <Field className='form-control fs-5' type='email' name='email' id='email'/>
                                <ErrorMessage name='email' component='p' className='text-danger position-absolute'/>
                            </div>
                            <div className='mb-4'>
                                <label htmlFor="avatar">Avatar</label>
                                <Field className='form-control fs-5' type='number' max={99} min={0} name='avatar' id='avatar'/>
                                <ErrorMessage name='avatar' component='p' className='text-danger position-absolute'/>
                            </div>
                            <div className='mb-4'>
                                <label htmlFor="gender">Gender</label>
                                <Field className='form-control fs-5' as='select' name='gender'>
                                    <option value="">Choose gender</option>
                                    <option value="men">Men</option>
                                    <option value="women">Women</option>
                                </Field>
                                <ErrorMessage name='gender' component='p' className='text-danger position-absolute'/>
                            </div>
                            <div className='mb-4'>
                                <label htmlFor="status">Status</label>
                                <Field className='form-control fs-5' as='select' name='status'>
                                    <option value="">Choose status</option>
                                    {Object.keys(contactStatuss).map(status => (
                                        <option key={status} value={status}>
                                            {status.charAt(0).toUpperCase() + status.slice(1)}
                                        </option>
                                    ))}
                                </Field>
                                <ErrorMessage name='status' component='p' className='text-danger position-absolute'/>
                            </div>
                            <div className='mb-4'>
                                <label className='form-check-label fs-5' htmlFor="favorite">Favorite</label>
                                <Field className='form-check-input m-1 fs-4' type='checkbox' name='favorite'/>
                            </div>
                            
                            <hr className="my-4" />
                            <h4 className="text-center mb-4">Додаткова інформація</h4>
                            
                            <div className='mb-4'>
                                <label htmlFor="viber">Viber</label>
                                <Field className='form-control fs-5' type='text' name='viber' id='viber' placeholder='+380991234567'/>
                                <ErrorMessage name='viber' component='p' className='text-danger position-absolute'/>
                            </div>
                            
                            <div className='mb-4'>
                                <label htmlFor="telegram">Telegram</label>
                                <Field className='form-control fs-5' type='text' name='telegram' id='telegram' placeholder='@username'/>
                                <ErrorMessage name='telegram' component='p' className='text-danger position-absolute'/>
                            </div>
                            
                            <div className='mb-4'>
                                <label htmlFor="birthday">День народження</label>
                                <Field className='form-control fs-5' type='date' name='birthday' id='birthday'/>
                                <ErrorMessage name='birthday' component='p' className='text-danger position-absolute'/>
                            </div>
                            
                            <div className='mb-4'>
                                <label htmlFor="address">Адреса</label>
                                <Field className='form-control fs-5' type='text' name='address' id='address' placeholder='Місто, вулиця, номер'/>
                                <ErrorMessage name='address' component='p' className='text-danger position-absolute'/>
                            </div>
                            
                            <div className='mb-4'>
                                <label htmlFor="notes">Нотатки</label>
                                <Field className='form-control fs-5' as='textarea' name='notes' id='notes' rows='3' placeholder='Додаткові нотатки про контакт'/>
                                <ErrorMessage name='notes' component='p' className='text-danger position-absolute'/>
                            </div>
                            
                            <button type='submit' className='btn btn-primary btn-lg form-control' disabled={isSubmitting}>Add</button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )
}