import wanderlustGoldBadge from '../assets/images/wanderlust_2025_gold-winner-badge_white.svg';
import bCertifiedLogo from '../assets/images/Website-Footer-Logos_B-Certified.svg';
import britishAirwaysLogo from '../assets/images/Website-Footer-Logos_Britsh-Airways.svg';
import whichRecommendedProvider from '../assets/images/Which-Recommended-Provider-Dec-2025_White.svg';
import cyberEssentialsPlusLogo from '../assets/images/Cyber-Essentials-Plus_logo-2.svg';
import audleytravel from '../assets/images/audley_travel.png';

const partners = [
  {
    id: 1,
    image: bCertifiedLogo,
    alt: "Certified B Corporation",
  },
  {
    id: 2,
    image: britishAirwaysLogo,
    alt: "British Airways Preferred Partner",
  },
  {
    id: 3,
    image: cyberEssentialsPlusLogo,
    alt: "Cyber Essentials Plus",
  },
  {
    id: 4,
    // Keep placeholder or remove if this logo is no longer in the footer
    image: audleytravel,
    alt: "Telegraph Travel Awards",
  },
  {
    id: 5,
    image: wanderlustGoldBadge,
    alt: "Wanderlust Travel Awards",
  },
  {
    id: 6,
    image: whichRecommendedProvider,
    alt: "Which? Recommended Provider",
  },
];

export default function PartnerLogos() {
  return (
    <section className="bg-[#051A14] py-6 md:py-8 border-t border-b border-[#1a3028]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 lg:gap-16">
          {partners.map((partner) => (
            <img
              key={partner.id}
              src={partner.image}
              alt={partner.alt}
              // Strictly constrained height ensures the strip stays highly compact
              className="h-10 md:h-12 lg:h-14 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity duration-300"
            />
          ))}
        </div>
      </div>
    </section>
  );
}