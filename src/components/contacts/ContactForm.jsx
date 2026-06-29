import { useState } from 'react'
import TextInput from '../ui/TextInput.jsx'
import Button from '../ui/Button.jsx'

// Shared Add/Edit form. Phase 2 keeps fields typeable via local state, but the
// submit is a no-op; Phase 3 (F6) swaps in the useForm hook + real validation
// and submit handling, and Edit prefills via initialValues.
export default function ContactForm({ submitLabel = 'Add Contact' }) {
  const [values, setValues] = useState({ name: '', email: '', phone: '' })

  const handleChange = (e) => {
    const { name, value } = e.target
    setValues((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // No submit logic yet (Phase 3 / F6).
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <TextInput
        label="Name"
        name="name"
        value={values.name}
        onChange={handleChange}
        placeholder="Enter Name"
      />
      <TextInput
        label="Email"
        name="email"
        type="email"
        value={values.email}
        onChange={handleChange}
        placeholder="Enter Email"
      />
      <TextInput
        label="Phone"
        name="phone"
        value={values.phone}
        onChange={handleChange}
        placeholder="Enter Phone"
      />
      <Button type="submit" variant="primary" className="w-full">
        {submitLabel}
      </Button>
    </form>
  )
}
