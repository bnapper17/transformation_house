import Image from "next/image"
import Link from "next/link"
import Navigation from "./Navigation"
import MobileNav from "./MobileNav"
import logoImage from "@/public/images/logo_image.png"

// The site name is styled text rather than a heading: each page provides its
// own <h1>, and a heading here would give every page two.
export default function Header() {
  return(
    <header className="z-50 sticky top-0 h-(--header-h) pb-2 md:pb-3 flex flex-row justify-between items-end bg-background border-b-accent border-b">

      <Link href="/" className="flex flex-row gap-3 items-end">
        <Image
          src={logoImage}
          alt=""
          preload
          sizes="(min-width: 768px) 96px, 64px"
          className="h-16 w-16 md:h-24 md:w-24 ml-4 md:ml-10"
        />
        <div>
          <p className="font-script text-4xl lg:text-6xl leading-none text-secondary text-center font-bold mb-1">Butterfly</p>
          <p className="font-serif text-xl lg:text-4xl leading-tight text-primary text-center">Transformation House</p>
        </div>
      </Link>

      <div className="hidden nav:block">
        <Navigation/>
      </div>
      <MobileNav/>

    </header>
  )
}
