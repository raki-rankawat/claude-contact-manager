import ContactCard from '../components/contacts/ContactCard.jsx'

// Static placeholder data for the Phase 2 shell. Phase 3 (F3) replaces this
// with real contacts pulled from the data layer.
const placeholderContacts = [
  { id: 1, name: 'Leanne Graham', email: 'Sincere@april.biz', phone: '1-770-736-8031 x56442' },
  { id: 2, name: 'Ervin Howell', email: 'Shanna@melissa.tv', phone: '010-692-6593 x09125' },
  { id: 3, name: 'Clementine Bauch', email: 'Nathan@yesenia.net', phone: '1-463-123-4447' },
]

export default function ContactsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      <h1 className="mb-8 text-4xl font-bold tracking-tight">
        <span className="text-brand">Contact</span>{' '}
        <span className="text-gray-800">List</span>
      </h1>
      <div className="space-y-4">
        {placeholderContacts.map((contact) => (
          <ContactCard key={contact.id} contact={contact} />
        ))}
      </div>
    </div>
  )
}
