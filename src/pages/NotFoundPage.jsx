import { Link } from 'react-router-dom'
import Button from '../components/ui/Button.jsx'

export default function NotFoundPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6">
      <p className="text-6xl font-bold text-brand">404</p>
      <h1 className="mt-4 text-2xl font-semibold text-gray-800">Page not found</h1>
      <p className="mt-2 text-gray-600">
        The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <div className="mt-8">
        <Button as={Link} to="/" variant="primary">
          Back to Home
        </Button>
      </div>
    </div>
  )
}
