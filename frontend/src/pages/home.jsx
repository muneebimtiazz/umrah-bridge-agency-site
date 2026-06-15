import { CuratedSpiritualPaths } from "../components/curated-spiritual-paths";
import { FeaturedUmrahPackages } from "../components/featured-umrah-packages";
import  GlobalStats  from "../components/global-stats";
import FAQSection  from "../components/faq-section";
import HeroSection from "../components/hero-section";
import PartnerLogos from "../components/partner-logos"
import TrustAwards from "../components/trust-awards"
import CustomerReviews from "../components/customer-reviews"
// import Certifications from "../components/certifications"
import PreFooterCertifications from "../components/pre-footer-certifications";

export default function Home() {
  return (
    <>
     <HeroSection/>

      <PreFooterCertifications/>
      <FeaturedUmrahPackages />
      <GlobalStats />
      <FAQSection />
      <PartnerLogos/>
      <CuratedSpiritualPaths />
      <TrustAwards/>
      <CustomerReviews/>
      {/* <Certifications/> */}
    </>
  );
}