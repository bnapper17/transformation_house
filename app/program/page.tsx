import type { Metadata } from "next";
import Header from "@/components/Header";
import Image, { type StaticImageData } from "next/image";

import FoundersPhoto from "@/public/images/founders.jpg";
import ChurchPhoto from "@/public/images/churchFiller.jpeg";
import MeetingPhoto from "@/public/images/meetingFiller.jpeg";
import MentorshipPhoto from "@/public/images/mentorship.jpg";

import { VISION } from "@/lib/vision";

export const metadata: Metadata = {
  title: "Our Program",
  description:
    "Learn about Stepping into Freedom, the faith-based step program at Butterfly Transformation House — a Christian halfway house and drug and alcohol rehabilitation program in Laconia, Indiana.",
};

// `imagePosition` sets the crop focus for photos whose subject isn't centered
// (e.g. portrait shots squeezed into the 4:3 frame); defaults to center.
const SECTIONS: {
  title: string;
  image: StaticImageData;
  alt: string;
  text: string;
  imagePosition?: string;
}[] = [
  { title: "Vision", image: FoundersPhoto, alt: "Founders of Butterfly Transformation House", text: VISION },
  { title: "Church Services", image: ChurchPhoto, alt: "Hands reaching toward each other before a cross", text: "Grace Tabernacle in Laconia, IN is our home church, which we attend on Wednesdays as well as Sundays." },
  { title: "Meetings", image: MeetingPhoto, alt: "A hand extended in support during a meeting", text: "Every Monday, Tuesday, and Thursday we come together as one and learn more about the road to recovery." },
  { title: "Personal Mentorship", image: MentorshipPhoto, alt: "Two smiling women from Butterfly Transformation House holding candles", text: "Guidance will be provided during your stay by a mentor. This mentor is experienced to help guide and direct you along the way in your walk with Christ.", imagePosition: "object-[center_25%]" },
];

export default function Program() {
  return (
    <div>
      <Header />
      <div className="mx-auto max-w-5xl px-6 py-10">
        <h1 className="text-4xl font-serif text-secondary mb-2">Our Program</h1>
        <p className="text-foreground lg:text-lg mb-8">
          This sober living facility requires completion of a faith-based step program called Stepping into Freedom.
        </p>
        <p className="font-serif italic text-secondary text-2xl md:text-3xl leading-snug border-l-4 border-accent pl-5 mb-12">
          &ldquo;Where broken lives are transformed, hope is restored, and families are made whole through Jesus Christ&rdquo;
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
                  className={`object-cover ${section.imagePosition ?? ""}`}
                />
              </div>
              <div className="md:w-1/2">
                <h2 className="text-2xl lg:text-3xl font-serif text-secondary mb-3 lg:mb-4 border-b border-accent pb-2">
                  {section.title}
                </h2>
                <p className="text-foreground lg:text-lg leading-relaxed">{section.text}</p>
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
