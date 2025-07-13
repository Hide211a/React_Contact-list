import './App.css'

import { BrowserRouter as Router, Routes, Route } from 'react-router'
import { Provider } from 'react-redux'
import store from './store.js'

import ContactList from './pages/ContactList/ContactList'
import AddContact from './pages/AddContact/AddContact'
import EditContact from './pages/EditContact/EditContact'
import NotFound from './pages/NotFound/NotFound'
import Header from './components/Header/Header'

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Header/>
        <Routes>
          <Route path='/' element={<div className="ios-font"><ContactList/></div>}/>
          <Route path='/add-contact' element={<div className="ios-font"><AddContact/></div>}/>
          <Route path='/edit-contact/:id' element={<div className="ios-font"><EditContact/></div>}/>
          <Route path='*' element={<NotFound/>}/>
        </Routes>
      </Router>
    </Provider>
  )
}

export default App
