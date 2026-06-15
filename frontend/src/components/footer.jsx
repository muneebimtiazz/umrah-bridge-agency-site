import logo from '/vite.svg'
import payment from '../assets/images/payment.png'
import { NavLink } from 'react-router-dom'
import  PreFooterCertifications  from './pre-footer-certifications'
// import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react'

const Footer = () => {
  return (
    <>
    <PreFooterCertifications/>
    <footer className='w-full bg-[#051A14] text-[#B4BBB9] py-10 border-t border-[#1a3028]'>
      <div className='max-w-7xl mx-auto px-6 lg:px-10'>
        
        {/* Top Grid: Expanded to 5 columns for maximum detail while staying compact */}
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-6 gap-y-10 mb-10'>
          
          {/* Column 1: Company */}
          <div>
            <h3 className='text-[13px] font-bold text-white mb-3'>Company</h3>
            <ul className='flex flex-col gap-1.5'>
              <li><NavLink className="text-[12px] hover:underline hover:text-[#DDB95A]">About Us</NavLink></li>
              <li><NavLink className="text-[12px] hover:underline hover:text-[#DDB95A]">Careers</NavLink></li>
              <li><NavLink className="text-[12px] hover:underline hover:text-[#DDB95A]">Press & Media</NavLink></li>
              <li><NavLink className="text-[12px] hover:underline hover:text-[#DDB95A]">Trust & Safety</NavLink></li>
              <li><NavLink className="text-[12px] hover:underline hover:text-[#DDB95A]">Customer Reviews</NavLink></li>
            </ul>
          </div>

          {/* Column 2: Our Services */}
          <div>
            <h3 className='text-[13px] font-bold text-white mb-3'>Our Services</h3>
            <ul className='flex flex-col gap-1.5'>
              <li><NavLink className="text-[12px] hover:underline hover:text-[#DDB95A]">Umrah Packages</NavLink></li>
              <li><NavLink className="text-[12px] hover:underline hover:text-[#DDB95A]">Hajj Expeditions</NavLink></li>
              <li><NavLink className="text-[12px] hover:underline hover:text-[#DDB95A]">Visa Processing</NavLink></li>
              <li><NavLink className="text-[12px] hover:underline hover:text-[#DDB95A]">Flights & Transfers</NavLink></li>
              <li><NavLink className="text-[12px] hover:underline hover:text-[#DDB95A]">Ziyarat Tours</NavLink></li>
            </ul>
          </div>

          {/* Column 3: Support & Resources */}
          <div>
            <h3 className='text-[13px] font-bold text-white mb-3'>Support</h3>
            <ul className='flex flex-col gap-1.5'>
              <li><NavLink className="text-[12px] hover:underline hover:text-[#DDB95A]">Help Center</NavLink></li>
              <li><NavLink className="text-[12px] hover:underline hover:text-[#DDB95A]">Pilgrim Guide</NavLink></li>
              <li><NavLink className="text-[12px] hover:underline hover:text-[#DDB95A]">Luggage Policy</NavLink></li>
              <li><NavLink className="text-[12px] hover:underline hover:text-[#DDB95A]">Cancellation Policy</NavLink></li>
              <li><NavLink className="text-[12px] hover:underline hover:text-[#DDB95A]">FAQs</NavLink></li>
            </ul>
          </div>

          {/* Column 4: Business & Apps */}
          <div>
            <h3 className='text-[13px] font-bold text-white mb-3'>Business & Apps</h3>
            <ul className='flex flex-col gap-1.5'>
              <li><NavLink className="text-[12px] hover:underline hover:text-[#DDB95A]">Travel Agents (B2B)</NavLink></li>
              <li><NavLink className="text-[12px] hover:underline hover:text-[#DDB95A]">Become an Affiliate</NavLink></li>
              <li><NavLink className="text-[12px] hover:underline hover:text-[#DDB95A]">Advertise with Us</NavLink></li>
              <li className='mt-2'><NavLink className="text-[12px] hover:underline hover:text-[#DDB95A]">Download iOS App</NavLink></li>
              <li><NavLink className="text-[12px] hover:underline hover:text-[#DDB95A]">Download Android App</NavLink></li>
            </ul>
          </div>

          {/* Column 5: Contact & Newsletter */}
          <div>
            <h3 className='text-[13px] font-bold text-white mb-3'>Contact & Newsletter</h3>
            <ul className='flex flex-col gap-1.5 mb-4'>
              <li className='text-[12px]'>13 Station Rd, London SE25 5AH</li>
              <li className='text-[12px] hover:text-[#DDB95A] cursor-pointer transition-colors'>support@umrahbridge.com</li>
              <li className='text-[12px] font-bold text-white mt-1'>
                Expert: <span className='text-[#DDB95A] font-normal'>01425 480 400</span>
              </li>
            </ul>
            
            <p className='text-[12px] leading-tight mb-2 pr-2'>
              Subscribe to our newsletter for exclusive offers.
            </p>
            <div className='flex gap-1 pr-2'>
              <input 
                className='bg-transparent border border-[#B4BBB9]/40 text-[12px] text-white px-2 py-1.5 rounded w-full focus:outline-none focus:border-[#DDB95A]' 
                type="text" 
                placeholder='Email Address'
              />
              <button className='bg-[#DDB95A] text-[#051A14] text-[12px] font-bold px-3 py-1.5 rounded transition-colors hover:bg-white'>
                Send
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section: Logo, Legal, Disclaimers, Dropdowns, Socials */}
        <div className='flex flex-col lg:flex-row justify-between gap-10 pt-8 border-t border-[#1a3028]'>
          
          {/* Left Side: Logo, Copyright, Legal Links, Fine Print */}
          <div className='flex-1 max-w-4xl'>
            <div className='flex flex-col sm:flex-row sm:items-start gap-4 mb-4'>
              <img className='w-12 h-12 object-contain shrink-0' src={logo} alt="Umrah Bridge Logo" />
              <div className='flex flex-col gap-1.5'>
                <p className='text-[12px] text-white font-semibold'>
                  © 2026 Umrah Bridge LLC. All rights reserved. <span className='font-normal text-[#B4BBB9] ml-1'>| ATOL & IATA Protected Agent</span>
                </p>
                <div className='flex flex-wrap gap-x-4 gap-y-1 mt-1'>
                  <NavLink className="text-[12px] font-bold text-white hover:underline">Terms of Use</NavLink>
                  <NavLink className="text-[12px] font-bold text-white hover:underline">Privacy and Cookies Statement</NavLink>
                  <NavLink className="text-[12px] font-bold text-white hover:underline">Cookie consent</NavLink>
                  <NavLink className="text-[12px] font-bold text-white hover:underline">How the site works</NavLink>
                  <NavLink className="text-[12px] font-bold text-white hover:underline">Accessibility Statement</NavLink>
                </div>
              </div>
            </div>

            <div className='space-y-3 mt-4 text-[#B4BBB9]/80'>
              <p className='text-[12px] leading-tight text-justify'>
                This is the version of our website addressed to speakers of English in the United Kingdom. If you are a resident of another country or region, please select the appropriate version of Umrah Bridge for your country or region in the drop-down menu. Package availability and pricing may vary by region.
              </p>
              <p className='text-[12px] leading-tight text-justify'>
                While we strive to ensure a seamless spiritual journey, flight schedules, hotel availability, and package prices are subject to change by our third-party partners. Visa approvals and regulations are at the sole discretion of the Saudi Ministry of Hajj and Umrah. Please review all package details, cancellation policies, and terms before confirming your booking.
              </p>
            </div>
          </div>

          {/* Right Side: Selectors, Socials, Payments */}
          <div className='flex flex-col items-start lg:items-end gap-5 shrink-0'>
            
            {/* Dropdowns */}
            <div className='flex gap-2 w-full sm:w-auto'>
              <select className='bg-transparent border border-[#B4BBB9]/40 text-white text-[12px] py-1.5 px-3 rounded w-full sm:w-auto font-bold focus:outline-none focus:border-[#DDB95A]'>
                <option className="text-gray-900">$ USD</option>
                <option className="text-gray-900">£ GBP</option>
                <option className="text-gray-900">€ EUR</option>
                <option className="text-gray-900">ر.س SAR</option>
              </select>
              <select className='bg-transparent border border-[#B4BBB9]/40 text-white text-[12px] py-1.5 px-3 rounded w-full sm:w-auto font-bold focus:outline-none focus:border-[#DDB95A]'>
                <option className="text-gray-900">United Kingdom</option>
                <option className="text-gray-900">United States</option>
                <option className="text-gray-900">Pakistan</option>
                <option className="text-gray-900">Saudi Arabia</option>
              </select>
            </div>

            {/* Social Icons (Uncommented for full detail) */}
            {/* <div className='flex gap-4 items-center'>
              <Facebook size={18} className="text-white hover:text-[#DDB95A] cursor-pointer transition-colors" />
              <Twitter size={18} className="text-white hover:text-[#DDB95A] cursor-pointer transition-colors" />
              <Instagram size={18} className="text-white hover:text-[#DDB95A] cursor-pointer transition-colors" />
              <Youtube size={20} className="text-white hover:text-[#DDB95A] cursor-pointer transition-colors" />
            </div> */}

            {/* Payment Methods */}
            <img className='w-56 h-auto mt-2 opacity-70 mix-blend-screen' src={payment} alt="Accepted Payments" />
          </div>

        </div>
      </div>
    </footer>
    </>
  )
}

export default Footer