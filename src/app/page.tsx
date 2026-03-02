import { redirect } from 'next/navigation'

export default function HomePage() {
  // Esto redirige automáticamente a /registro con un status 307 (temporal)
  redirect('/registro')
}