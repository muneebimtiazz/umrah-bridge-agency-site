import { ArrowLeft, Clock } from 'lucide-react'
import { Link } from 'react-router-dom'
import logo from '/vite.svg'

function ComingSoon() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-linear-to-br px-6 text-center">

      {/* Icon */}
      <div className="w-16 h-16 rounded-full bg-[#e8ecf8] flex items-center justify-center mb-6">
        <Clock size={28} className="text-[#C9A84C]" />
      </div>

      {/* Text */}
      <h2 className="text-[2rem] font-bold text-[#0b1a40] leading-tight mb-3">
        Coming Soon
      </h2>
      <p className="text-gray-400 text-[14px] max-w-sm leading-relaxed mb-8">
        We're working hard to bring this page to life. Check back soon for updates on our services and solutions.
      </p>

      {/* Divider dots */}
      <div className="flex gap-2 mb-8">
        <span className="w-2 h-2 rounded-full bg-[#C9A84C]" />
        <span className="w-2 h-2 rounded-full bg-[#0434A0]/40" />
        <span className="w-2 h-2 rounded-full bg-[#0434A0]/20" />
      </div>

      {/* Back button */}
      <Link
        to="/"
        className="hidden rounded-md bg-[#C9A84C] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#DDB95A] md:inline-flex"
      >
        <ArrowLeft size={14} /> Back to Home
      </Link>
    </div>
  )
}

export default ComingSoon