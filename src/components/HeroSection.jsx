import { Link } from "react-router-dom";
import { QRCodeCanvas as QRCode } from "qrcode.react";

export default function HeroSection() {
  const downloadLink = `${window.location.origin}/download`;

  return (
    <div className="mx-auto px-4 py-4 md:py-6 max-w-xs sm:max-w-screen-lg">
      <div className="flex flex-col lg:flex-row items-center justify-start gap-4">
        {/* 📱 Phone mockup */}
        <div className="w-full lg:w-5/12 flex justify-center">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/kealthy-90c55.appspot.com/o/Kealthy_web%2Fapp-screenshot.png?alt=media&token=4ed3c154-b851-4d07-92a8-681382f9c818"
            alt="App screenshot"
            className="w-40 sm:w-56 md:w-64 lg:w-72"
          />
        </div>

        {/* 📝 Text + badges + QR */}
        <div className="w-full lg:w-6/12 flex flex-col space-y-4 md:space-y-6">
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-sans   font-extrabold text-[#027d4f] leading-tight max-w-prose">
            Get fresh organic delivered to your door every day. Stay healthy in
            body and mind.
          </h1>

          <div className="flex flex-row flex-wrap items-center gap-4">
            {/* Store badges */}
            <div className="flex flex-col space-y-3">
              <Link
                to="https://play.google.com/store/apps/details?id=com.COTOLORE.Kealthy"
                className="block w-32 sm:w-36 md:w-40 lg:w-44"
              >
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/kealthy-90c55.appspot.com/o/Kealthy_web%2Fgoogle-store.png?alt=media&token=d9b10892-377a-4937-94b3-9ee4b73bdc50"
                  alt="Get it on Google Play"
                  className="w-full object-contain"
                />
              </Link>
              <Link
                to="https://apps.apple.com/in/app/kealthy/id6740621148"
                className="block w-32 sm:w-36 md:w-40 lg:w-44"
              >
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/kealthy-90c55.appspot.com/o/Kealthy_web%2Fapple-store.png?alt=media&token=b534cb6f-a13c-4b68-a642-ed9c1fbd76b7"
                  alt="Download on the App Store"
                  className="w-full object-contain"
                />
              </Link>
            </div>

            {/* OR + QR */}
            <div className="flex-shrink-0 flex items-center gap-2">
              <span className="text-base sm:text-lg font-semibold">(OR)</span>
              <QRCode
                value={downloadLink}
                size={64}
                className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
