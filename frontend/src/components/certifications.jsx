// Import your actual images here later:
// import atolLogo from '../assets/images/atol.png';
// import btaLogo from '../assets/images/bta.png';
// import iataLogo from '../assets/images/iata.png';
// import feefoLogo from '../assets/images/feefo.png';
// import abtotLogo from '../assets/images/abtot.png';

const accreditations = [
  {
    id: 1,
    // Replace with your imported image, e.g., image: atolLogo
    image: "https://placehold.co/120x80/transparent/333?text=ATOL",
    alt: "ATOL Protected",
  },
  {
    id: 2,
    image: "https://placehold.co/200x80/transparent/333?text=British+Travel+Awards",
    alt: "British Travel Awards",
  },
  {
    id: 3,
    image: "https://placehold.co/120x80/transparent/333?text=IATA",
    alt: "IATA",
  },
  {
    id: 4,
    image: "https://placehold.co/220x80/transparent/333?text=Feefo",
    alt: "Feefo Service Rating",
  },
  {
    id: 5,
    image: "https://placehold.co/140x80/transparent/333?text=ABTOT",
    alt: "ABTOT Member",
  },
];

export function Certifications() {
  return (
    <section className="bg-white py-6 md:py-8 border-y border-gray-200">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 lg:gap-16">
          {accreditations.map((item) => (
            <img
              key={item.id}
              src={item.image}
              alt={item.alt}
              className="h-12 md:h-16 w-auto object-contain mix-blend-multiply"
            />
          ))}
        </div>
      </div>
    </section>
  );
}