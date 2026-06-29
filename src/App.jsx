import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/layout/Header.jsx'

// Phase 2 no-op provider stub. Phase 3 (F2) replaces this with the real
// useReducer-based ContactProvider in src/context/ContactContext.jsx.
function ContactProvider({ children }) {
  return children
}

// Phase 2.3 — Header is wired in above the routes. Real page components replace
// the inline placeholders in step 2.5.
function App() {
  return (
    <ContactProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<div className="p-6">Contacts</div>} />
          <Route path="/contact/add" element={<div className="p-6">Add Contact</div>} />
          <Route path="/contact/edit/:id" element={<div className="p-6">Edit Contact</div>} />
          <Route path="/about" element={<div className="p-6">About</div>} />
          <Route path="*" element={<div className="p-6">404 — Not Found</div>} />
        </Routes>
      </BrowserRouter>
    </ContactProvider>
  )
}

export default App
