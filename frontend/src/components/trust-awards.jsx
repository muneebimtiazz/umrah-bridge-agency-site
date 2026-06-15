import abtalogo from "../assets/images/abta-logo.svg";
import bbtalogo from "../assets/images/british-travel-awards.png";
import TTNGlog from "../assets/images/TTNG.png";

const logos = [
  {
    id: 1,
    image: abtalogo,
    alt: "ABTA Member",
  },
  {
    id: 2,
    image: bbtalogo,
    alt: "ATOL / Travel Protection",
  },
  {
    id: 3,
    image: TTNGlog,
    alt: "The Travel Network Group",
  },
];

export default function TrustAwards() {
  return (
    <section className="bg-[#D4AF37] py-12 px-6">
      <div className="max-w-5xl mx-auto flex flex-col items-center">
        
        {/* Header */}
        <div className="text-center mb-10 text-gray-900">
          <p className="text-[16px] md:text-[18px] font-medium leading-snug">
            Fully Accredited UK Travel Agency
          </p>

          <h2 className="text-[20px] md:text-[24px] font-bold mt-1">
            100% Financial Protection You Can Trust
          </h2>
        </div>

        {/* Logos */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-24 w-full">
          {logos.map((logo) => (
            <div
              key={logo.id}
              className="flex flex-col items-center justify-center shrink-0"
            >
              <img
                src={logo.image}
                alt={logo.alt}
                className="h-24 md:h-28 lg:h-32 w-auto object-contain mix-blend-multiply"
                loading="lazy"
              />

              {logo.caption && (
                <p className="mt-4 text-[12px] font-bold text-gray-900 text-center whitespace-pre-line leading-snug">
                  {logo.caption}
                </p>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}