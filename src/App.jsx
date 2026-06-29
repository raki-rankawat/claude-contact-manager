import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/layout/Header.jsx'
import ContactsPage from './pages/ContactsPage.jsx'
import AddContactPage from './pages/AddContactPage.jsx'
import EditContactPage from './pages/EditContactPage.jsx'
import AboutPage from './pages/AboutPage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'

// Phase 2 no-op provider stub. Phase 3 (F2) replaces this with the real
// useReducer-based ContactProvider in src/context/ContactContext.jsx.
function ContactProvider({ children }) {
  return children
}

// Phase 2.5 — real page components mounted on every route.
function App() {
  return (
    <ContactProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<ContactsPage />} />
          <Route path="/contact/add" element={<AddContactPage />} />
          <Route path="/contact/edit/:id" element={<EditContactPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </ContactProvider>
  )
}

export default App
