import ProfileSection from "./ProfileSection";
import SocialLinks from "./SocialLinks";
import ImageGrid from "./ImageGrid";
import OfferCountdown from "./OfferCountdown";
import Footer from "./Footer";

const PROFILE_IMAGE = "/fansly.webp";
const PROFILE_NAME = "Pauli Belen";

/**
 * Everything behind the +18 gate. Mounted by <AgeGate /> only once the visitor
 * has confirmed, so none of this reaches the initial HTML.
 */
export default function AdultContent() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#101010]">
      <div className="fixed inset-0 z-0 scale-110 bg-[url('/onlyfans_free.webp')] bg-contain bg-center blur-xl brightness-[.62] saturate-[.9]" />
      <div className="fixed inset-0 z-0 bg-black/10" />

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[600px] flex-col overflow-hidden bg-[#0d0d0f] shadow-[0_0_65px_rgba(0,0,0,.5)] transition-all duration-700 ease-out sm:my-5 sm:min-h-[calc(100vh-2.5rem)] sm:w-[calc(100%-2.5rem)] sm:rounded-md">
        <main className="w-full pb-6">
          <ProfileSection
            name={PROFILE_NAME}
            username="@paulibelen1"
            profileImage={PROFILE_IMAGE}
          />
          <div className="flex flex-col items-center px-3 sm:px-4">
            <div className="mt-4 w-full">
              <SocialLinks />
            </div>
            <div className="mt-11 w-full">
              <ImageGrid />
            </div>
            <OfferCountdown />
            <Footer />
          </div>
        </main>
      </div>
    </div>
  );
}
