import * as Yup from 'yup'

export const contactValidationSchema = Yup.object().shape({
    firstName: Yup.string().required('First Name is required').min(2, 'Min 2 symbols').max(16, 'Max 16 symbols'),
    lastName: Yup.string().required('Last Name is required').min(2, 'Min 2 symbols').max(16, 'Max 16 symbols'),
    phone: Yup.string().required('Phone is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    avatar: Yup.string().required('Avatar is required'),
    gender: Yup.string().oneOf(['men','women'], 'Invalid gender').required('Gender is required'),
    status: Yup.string().required('Status is required'),
    favorite: Yup.boolean(),
    // Додаткові поля (не обов'язкові)
    viber: Yup.string().optional(),
    telegram: Yup.string().optional(),
    birthday: Yup.date().optional().max(new Date(), 'Birthday cannot be in the future'),
    address: Yup.string().optional().max(200, 'Address too long'),
    notes: Yup.string().optional().max(500, 'Notes too long')
})

export const statusValidationSchema = Yup.object().shape({
  name: Yup.string()
    .required('Назва статусу обовʼязкова')
    .min(2, 'Мінімум 2 символи')
    .max(16, 'Максимум 16 символів')
    .matches(/^[a-zA-Zа-яА-Я0-9_\- ]+$/, 'Тільки літери, цифри, пробіли, - та _')
    .test('unique', 'Такий статус вже існує', function(value) {
      const { existingNames = [] } = this.options.context || {};
      if (!value) return true;
      return !existingNames.includes(value.trim().toLowerCase());
    }),
  color: Yup.string()
    .required('Колір обовʼязковий')
    .matches(/^#([0-9A-Fa-f]{6})$/, 'Некоректний hex-колір')
});