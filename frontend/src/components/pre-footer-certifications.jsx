// Import your actual images here later:
import atolLogo from '../assets/images/atol.png';
import btaLogo from '../assets/images/bbta.png';
import iataLogo from '../assets/images/iata.png';
import feefoLogo from '../assets/images/feefo.png';
import abtotLogo from '../assets/images/etoa.svg';

const accreditations = [
  {
    id: 1,
    // Replace with your imported image, e.g., image: atolLogo
    image: atolLogo,
    alt: "ATOL Protected",
  },
  {
    id: 2,
    image: btaLogo,
    alt: "British Travel Awards",
  },
  {
    id: 3,
    image: iataLogo,
    alt: "IATA Accredited",
  },
  {
    id: 4,
    image: feefoLogo,
    alt: "Feefo Service Rating",
  },
  {
    id: 5,
    image: abtotLogo,
    alt: "ABTOT Member",
  },
];

export default function PreFooterCertifications() {
  return (
    <section className="bg-white py-4 md:py-5 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 lg:gap-14">
          {accreditations.map((item) => (
            <img
              key={item.id}
              src={item.image}
              alt={item.alt}
              className="h-10 w-auto object-contain "
            />
          ))}
        </div>
      </div>
    </section>
  );
}