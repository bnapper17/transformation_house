import type { Metadata } from "next";
import Header from "@/components/Header";
import Image from "next/image";

import FoundersPhoto from "@/public/images/founders.jpg";
import ChurchPhoto from "@/public/images/churchFiller.jpeg";
import MeetingPhoto from "@/public/images/meetingFiller.jpeg";

export const metadata: Metadata = {
  title: "Our Program",
  description:
    "Learn about Stepping into Freedom, the faith-based step program at Butterfly Transformation House — a Christian halfway house and drug and alcohol rehabilitation program in Laconia, Indiana.",
};

const LOREM_IPSUM =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

const SECTIONS = [
  { title: "Vision", image: FoundersPhoto, alt: "Founders of Butterfly Transformation House" },
  { title: "Church Services", image: ChurchPhoto, alt: "Hands reaching toward each other before a cross" },
  { title: "Meetings", image: MeetingPhoto, alt: "A hand extended in support during a meeting" },
];

export default function Program() {
  return (
    <div>
      <Header />
      <div className="mx-auto max-w-5xl px-6 py-10">
        <h1 className="text-4xl font-serif text-secondary mb-2">Our Program</h1>
        <p className="text-foreground mb-10">
          This Sober living facility requires a completion of a faith based step program called; Stepping into Freedom.
        </p>

        <div className="space-y-16">
          {SECTIONS.map((section, i) => (
            <section
              key={section.title}
              className={`flex flex-col ${
                i % 2 === 1 ? "md:flex-row-reverse" : "md:flex-row"
              } items-center gap-8`}
            >
              <div className="relative aspect-4/3 w-full md:w-1/2 flex-none overflow-hidden rounded-lg shadow-lg">
                <Image
                  src={section.image}
                  alt={section.alt}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="md:w-1/2">
                <h2 className="text-2xl font-serif text-secondary mb-3 border-b border-accent pb-2">
                  {section.title}
                </h2>
                <p className="text-foreground leading-relaxed">{LOREM_IPSUM}</p>
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
