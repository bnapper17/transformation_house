import Image from "next/image"
import Navigation from "./Navigation"
import MobileNav from "./MobileNav"
import logoImage from '../public/images/logo_image.png'

export default function Header() {
  return(
    <div className="z-50 sticky top-0 md:h-[15dvh] h-[10dvh] flex flex-row justify-between items-end bg-background border-b-accent border-b">

      <div className="flex flex-row gap-3 items-end">
        <Image
          src={logoImage}
          alt="Butterfly Transformation House Logo"
          className="h-[8vh] w-[8vh] md:h-[12vh] md:w-[12vh] md:mt-5 ml-4 md:ml-10"
          />
        {/* Logo Text */}
        <div className="">
          <h1 className="font-script text-4xl lg:text-6xl text-secondary text-center font-bold mb-2">Butterfly</h1>
          <h2 className="font-serif text-xl lg:text-4xl text-primary text-center">Transformation House</h2>
        </div>
      </div>

      <div className="hidden nav:block">
        <Navigation/>
      </div>
      <MobileNav/>

    </div>
  )
};
