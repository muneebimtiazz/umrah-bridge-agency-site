import React, { useRef } from "react";
import {
  Star,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const reviews = [
  {
    id: 1,
    title: "Flawless Umrah arrangements",
    body: "Booked our family luxury Umrah package from London. The hotel proximity to the Haram in Makkah was exactly as promised.",
    author: "Mohammed Malik",
    date: "12 May",
    verified: true,
  },
  {
    id: 2,
    title: "Brilliant visa handling",
    body: "Extremely happy with the swift Nusuk Masar visa processing. The team in Birmingham kept us updated throughout.",
    author: "Fatima Begum",
    date: "28 May",
    verified: true,
  },
  {
    id: 3,
    title: "Highly recommended for families",
    body: "Excellent service from start to finish. Everything from the direct flights to the Madinah ground transfers went seamlessly.",
    author: "Tariq Mahmood",
    date: "2 June",
    verified: true,
  },
  {
    id: 4,
    title: "Exceptional luxury execution",
    body: "Raffles Makkah hotel stay was spectacular. Outstanding concierge support answering all our questions about the 2026 rules.",
    author: "Zainab Akhtar",
    date: "5 June",
    verified: true,
  },
  {
    id: 5,
    title: "Stress-free spiritual journey",
    body: "They organized our tailored family group journey from Manchester perfectly. The high-speed train booking was a major plus.",
    author: "Farhan Ahmed",
    date: "8 June",
    verified: true,
  },
  {
    id: 6,
    title: "Honest and dependable team",
    body: "No hidden fees, accurate hotel descriptions, and fully protected flights. Will definitely use their services for our next trip.",
    author: "Yasmin Qureshi",
    date: "10 June",
    verified: true,
  },
  {
    id: 7,
    title: "Superb ground coordination",
    body: "The private VIP transfers made traveling between Jeddah, Makkah, and Madinah incredibly smooth with elderly parents.",
    author: "Bilal Hussain",
    date: "11 June",
    verified: true,
  },
  {
    id: 8,
    title: "Amazing Ramadan package",
    body: "Stunning experience during the last 10 nights. Proximity to the mosque made attending Taraweeh and Tahajjud effortless.",
    author: "Safiya Ali",
    date: "12 June",
    verified: true,
  },
  {
    id: 9,
    title: "First class pilgrim care",
    body: "First time traveling for Umrah and the guidance we received was comforting. Professional staff who genuinely care.",
    author: "Omar Farooq",
    date: "14 June",
    verified: true,
  },
  {
    id: 10,
    title: "Perfect custom itinerary",
    body: "They built a bespoke package matching our budget and dates precisely. Everything from flights to hotels was solid.",
    author: "Khadija Khan",
    date: "15 June",
    verified: true,
  },
  {
    id: 11,
    title: "Transparent and professional",
    body: "Excellent coordination with Saudi authorities. Got our visa approvals back within 24 hours just as advertised.",
    author: "Abdul Rahman",
    date: "15 June",
    verified: true,
  }
];

export default function CustomerReviews() {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      
      // Card width (260px) + Gap (16px) = 276px
      // Scroll by 5 cards at a time on large screens
      const cardWidth = 276; 
      const cardsToScroll = window.innerWidth >= 1024 ? 5 : 1;
      const scrollAmount = cardWidth * cardsToScroll;

      if (direction === "left") {
        if (scrollLeft <= 0) {
          // Wrap around to the absolute end of the carousel
          scrollRef.current.scrollTo({
            left: scrollWidth - clientWidth,
            behavior: "smooth",
          });
        } else {
          scrollRef.current.scrollBy({
            left: -scrollAmount,
            behavior: "smooth",
          });
        }
      } else {
        // Wrap around to the absolute beginning if close to or at the end
        if (scrollLeft + clientWidth >= scrollWidth - 10) {
          scrollRef.current.scrollTo({
            left: 0,
            behavior: "smooth",
          });
        } else {
          scrollRef.current.scrollBy({
            left: scrollAmount,
            behavior: "smooth",
          });
        }
      }
    }
  };

  return (
    <section className="bg-gray-50/50 py-12 md:py-16 relative overflow-hidden border-t border-gray-200">
      {/* Increased max-width to 90rem to comfortably fit 5 cards horizontally */}
      <div className="max-w-[90rem] mx-auto px-4 md:px-10 lg:px-12">
        
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-[#D4AF37] font-semibold text-xs uppercase tracking-widest bg-[#D4AF37]/10 px-3 py-1.5 rounded-full inline-block">
            Testimonials
          </span>
          
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl md:text-5xl">
            We're Trusted by <span className="text-[#D4AF37]">Travellers</span>
          </h2>
          
          <p className="mt-4 text-sm md:text-base text-gray-500 max-w-xl mx-auto leading-relaxed">
            Real memories. Real moments. Here are some of our favourite reviews from those who have journeyed with us.
          </p>
        </div>

        {/* Carousel */}
        <div className="relative flex items-center group">
          {/* Left Button */}
          <button
            type="button"
            onClick={() => scroll("left")}
            aria-label="Scroll left"
            className="absolute -left-3 md:-left-5 z-10 bg-white border border-gray-200 text-gray-800 hover:text-white hover:bg-[#00b67a] hover:border-[#00b67a] rounded-full p-2 shadow-sm transition-all duration-200 opacity-0 md:opacity-100 group-hover:opacity-100 cursor-pointer"
          >
            <ChevronLeft size={18} strokeWidth={2.5} />
          </button>

          {/* Cards Container */}
          <div
            ref={scrollRef}
            className="flex overflow-x-auto gap-4 snap-x snap-mandatory hide-scrollbar py-2 px-2 w-full"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {reviews.map((review) => (
              <div
                key={review.id}
                // Fixed width of 260px guarantees 5 cards fit cleanly within the 1440px (90rem) container
                className="bg-white rounded p-4 border border-gray-100 shadow-sm shrink-0 w-[260px] snap-center flex flex-col"
              >
                {/* Stars Header Row */}
                <div className="flex justify-between items-center mb-3">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className="bg-[#00b67a] text-white p-[3px] rounded-[2px]"
                      >
                        <Star
                          size={13}
                          fill="currentColor"
                          strokeWidth={0}
                        />
                      </div>
                    ))}
                  </div>

                  {review.verified && (
                    <div className="flex items-center gap-1 text-gray-500">
                      <CheckCircle2
                        size={13}
                        className="text-gray-400"
                      />
                      <span className="text-[12px] font-bold text-gray-500 leading-none mt-0.5">
                        Verified
                      </span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <h3 className="text-[13px] font-bold text-gray-900 mb-1.5 truncate">
                  {review.title}
                </h3>

                <p className="text-[12px] text-gray-600 leading-snug mb-4 flex-1">
                  {review.body}
                </p>

                {/* Footer */}
                <div className="text-[12px] text-gray-400 flex items-center gap-1 truncate border-t border-gray-100 pt-3">
                  <span className="font-bold text-gray-800 truncate">
                    {review.author},
                  </span>
                  <span>{review.date}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Right Button */}
          <button
            type="button"
            onClick={() => scroll("right")}
            aria-label="Scroll right"
            className="absolute -right-3 md:-right-5 z-10 bg-white border border-gray-200 text-gray-800 hover:text-white hover:bg-[#00b67a] hover:border-[#00b67a] rounded-full p-2 shadow-sm transition-all duration-200 opacity-0 md:opacity-100 group-hover:opacity-100 cursor-pointer"
          >
            <ChevronRight size={18} strokeWidth={2.5} />
          </button>
        </div>

        {/* Footer Rating */}
        <div className="mt-8 text-center flex flex-col items-center gap-1.5">
          <p className="text-[12px] text-gray-600">
            Rated <span className="font-bold text-gray-900">4.9</span> / 5 based
            on{" "}
            <span className="text-gray-900 underline cursor-pointer hover:text-[#00b67a]">
              13,317 reviews
            </span>
            . Showing our 5 star reviews.
          </p>

          <div className="flex items-center gap-1.5 justify-center mt-1">
            <div className="bg-[#00b67a] text-white p-[3px] rounded-sm">
              <Star size={16} fill="currentColor" strokeWidth={0} />
            </div>
            <span className="text-[16px] font-extrabold tracking-tight text-gray-900">
              Trustpilot
            </span>
          </div>
        </div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
            .hide-scrollbar::-webkit-scrollbar {
              display: none;
            }
          `,
        }}
      />
    </section>
  );
}