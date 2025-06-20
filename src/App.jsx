import './App.css'

import { BrowserRouter as Router, Routes, Route } from 'react-router'

import ContactList from './pages/ContactList/ContactList'
import AddContact from './pages/AddContact/AddContact'
import EditContact from './pages/EditContact/EditContact'
import NotFound from './pages/NotFound/NotFound'

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<ContactList/>}/>
        <Route path='/add-contact' element={<AddContact/>}/>
        <Route path='/edit-contact' element={<EditContact/>}/>
        <Route path='*' element={<NotFound/>}/>
      </Routes>
    </Router>
  )
}

export default App
