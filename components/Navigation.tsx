import Link from "next/link"

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/program", label: "Program" },
  { href: "/testimonies", label: "Testimonies" },
  { href: "/giving", label: "Giving" },
  { href: "/contact", label: "Contact" },
  { href: "/apply", label: "Apply" },
];

export default function Navigation() {

  return(
    <div>
      <nav className="flex flex-row items-center w-full justify-center gap-3 px-5 text-primary md:text-xl text-lg">
        {NAV_LINKS.map((link) => (
          <Link key={link.label} href={link.href}>
            {link.label}
          </Link>
        ))}
      </nav>
    </div>
  )
};
