import ProfileSection from "./components/ProfileSection";
import SocialLinks from "./components/SocialLinks";
import ImageGrid from "./components/ImageGrid";
import Footer from "./components/Footer";
import Portal from "./components/Portal";

const PROFILE_IMAGE = "/principal.jpeg";
const PROFILE_NAME = "Pauli Belen";

export default function Home() {
  return (
    <Portal>
    <div className="relative min-h-screen">
        {/* Blurry background image */}
        <div
          className="fixed inset-0 z-0 "
          style={{
            backgroundImage: "url('/onlyfans_novia_virtual.jpeg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "blur(10px) brightness(0.5)",
            transform: "scale(1.1)",
          }}
        />

        {/* Dark overlay */}
        <div className="fixed inset-0 z-0 bg-black/30" />















        {/* Main content */}
        <div className="relative w-full  z-10 flex min-h-screen flex-col items-center  md:px-4 md:py-6">


        {/* Modal/Card container */}
        <main className="w-full md:w-1/2 lg:w-1/3 overflow-hidden md:rounded-3xl self-center bg-zinc-950/90 shadow-2xl backdrop-blur-xl">
          {/* Hero profile section - full width, no padding */}
          <ProfileSection
            name={PROFILE_NAME}
            username="@paulibelen1"
            profileImage={PROFILE_IMAGE}
          />

          {/* Content area with padding */}
          <div className="flex flex-col items-center px-6 pb-8 bg-black -mt-2">
            {/* Social links */}
            <div className="mt-6 w-full">
              <SocialLinks />
            </div>

            {/* Secondary account link */}
            <div className="mt-6 text-center">
              <p className="text-xs text-zinc-500">
                <span className="mr-1">📍</span>
                <span className="text-pink-400">AR</span>
              </p>
              <p className="mt-1 text-sm text-zinc-400">
                Secundaria:{" "}
                <a
                  href="https://link.me/soypaulibelen"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:underline"
                >
                  @soypaulibelen
                </a>
              </p>
              <p className="mt-1 text-xs text-cyan-400">
                Si sos curioso dale click ✓
              </p>
            </div>

            {/* Image Grid */}
            <div className="mt-8 w-full">
              <ImageGrid />
            </div>

            {/* Footer */}
            <Footer />
          </div>
        </main>
        </div>
      </div>
    </Portal>
  );
}
