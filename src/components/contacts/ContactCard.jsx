import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronDown, ChevronUp, Pencil, Trash2 } from 'lucide-react'

// Bordered, expandable contact card. Local `open` state swaps the chevron icon
// (down → up) and toggles the detail rows; Phase 3 wires the edit link and
// delete button to data.
export default function ContactCard({ contact }) {
  const [open, setOpen] = useState(false)
  const { id, name, email, phone } = contact

  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-center justify-between gap-4 p-5">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="flex items-center gap-2 text-left text-lg font-semibold text-gray-800"
        >
          {name}
          {open ? (
            <ChevronUp size={18} className="text-gray-400" aria-hidden="true" />
          ) : (
            <ChevronDown size={18} className="text-gray-400" aria-hidden="true" />
          )}
        </button>
        <div className="flex items-center gap-1">
          <Link
            to={`/contact/edit/${id}`}
            aria-label={`Edit ${name}`}
            className="rounded-md p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700"
          >
            <Pencil size={18} aria-hidden="true" />
          </Link>
          <button
            type="button"
            aria-label={`Delete ${name}`}
            className="rounded-md p-2 text-brand transition-colors hover:bg-brand/10"
          >
            <Trash2 size={18} aria-hidden="true" />
          </button>
        </div>
      </div>

      {open && (
        <div className="space-y-2 border-t border-gray-100 px-5 py-4 text-sm text-gray-600">
          <div className="rounded-lg bg-gray-50 px-4 py-2.5">
            <span className="font-medium text-gray-700">Email:</span> {email}
          </div>
          <div className="rounded-lg bg-gray-50 px-4 py-2.5">
            <span className="font-medium text-gray-700">Phone:</span> {phone}
          </div>
        </div>
      )}
    </div>
  )
}
