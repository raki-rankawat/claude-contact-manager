import ContactForm from '../components/contacts/ContactForm.jsx'

export default function EditContactPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6">
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
          <h1 className="text-xl font-semibold text-gray-800">Edit Contact</h1>
        </div>
        <div className="p-6">
          <ContactForm submitLabel="Update Contact" />
        </div>
      </div>
    </div>
  )
}
