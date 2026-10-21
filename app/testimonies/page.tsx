import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Header from "@/components/Header";
import Image from "next/image";

import LexiePhoto from "@/public/images/lexie.jpeg";
import AshleyPhoto from "@/public/images/ashley.jpg";
import CodyPhoto from "@/public/images/cody.jpg";
import TrishPhoto from "@/public/images/trish.jpg";

export const metadata: Metadata = pageMetadata({
  path: "/testimonies",
  title: "Recovery Testimonies",
  description:
    "Real stories of recovery from men and women who found freedom from drug and alcohol addiction through Butterfly Transformation House, a faith-based halfway house serving Southern Indiana and the Louisville area.",
});

const TESTIMONIES = [
  {
    name: "Lexie",
    image: LexiePhoto,
    alt: "Lexie with her family",
    quote:
      "This half way house allowed an open door for my momma to have a true encounter with the Lord. This house gave a little girl her mom back, that she so badly desired for. It wasn't the house or the people that set her free from addiction it was them being ambassadors for Christ. The butterfly transformation house will forever be special to me! Today the Lord has restored my moms and my relationship into a Ruth and Naomi bond❤️ All because she was obedient and took that first step on getting the peace she so badly longed for.",
  },
  {
    name: "Ashley",
    image: AshleyPhoto,
    alt: "Ashley",
    quote:
      "It's not just for addicts, it's for all seeking to learn God and his ways. It's for men and women who have experienced abuse, child abuse, and emotional traumas. This is where God healed me. This is where God recreated who I am today. Because of this place I now can freely love and live a happy healthy life. I am forever changed because of the work God has and is doing in my life because of this place. It healed my mind, my body and my spirit. This truly is a home of healing and a life altering Transformation!",
  },
  {
    name: "Cody",
    image: CodyPhoto,
    alt: "Cody with his family",
    quote:
      "Going to the Transformation house 100% saved my life! Being surrounded with likeminded people and letting God really transform my life. I am so grateful of this program. The love of God that was poured out on me by the people associated with this program is like nothing I've ever experienced. I went from the drug addict that was in and out of jails and institutions to a man of God going into the same jails to tell the residents there the good news of the gospel of Jesus Christ!",
  },
  {
    name: "Trish",
    image: TrishPhoto,
    alt: "Trish",
    quote:
      "I went to the Butterfly House in 2019, a hopeless wretch of a woman. My life was trashed. I had lost everything. I had been in active addiction for 25 years. The people I met at the house showed me the love of Christ and what it looks like to be a faithful servant. Today I'm a mother a friend a sister. Today I'm a tree planted by the water. And oak of righteousness. What happened in my life was nothing short of a miracle. If you're looking for freedom, transformation. If you need a change and to know what it feels like to be loved give them a call. All glory to God what He's doing through these houses is powerful and beautiful.",
  },
];

export default function Testimonies() {
  return (
    <div>
      <Header />
      <div className="mx-auto max-w-5xl px-6 py-10">
        <h1 className="text-4xl font-serif text-secondary mb-2">Testimonies</h1>
        <p className="text-foreground mb-4">
          Real stories of restoration from people who walked through Butterfly
          Transformation House.
        </p>

        <blockquote className="mb-10">
          <p className="font-serif italic text-foreground text-lg leading-relaxed">
            &ldquo;Do not be conformed to this world, but be transformed by
            the renewal of your mind&hellip;&rdquo;
          </p>
          <p className="text-secondary font-semibold mt-2">
            &mdash; Romans 12:2
          </p>
        </blockquote>

        <div className="space-y-10">
          {TESTIMONIES.map((person, i) => (
            <section
              key={person.name}
              className={`flex flex-col ${
                i % 2 === 1 ? "md:flex-row-reverse" : "md:flex-row"
              } items-center gap-6 rounded-xl border border-accent/30 bg-background/70 p-6 sm:p-8 shadow-md`}
            >
              <div className="relative aspect-square w-40 sm:w-48 flex-none overflow-hidden rounded-2xl shadow-lg">
                <Image
                  src={person.image}
                  alt={person.alt}
                  fill
                  sizes="(min-width: 640px) 192px, 160px"
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <p className="font-serif italic text-foreground leading-relaxed">
                  &ldquo;{person.quote}&rdquo;
                </p>
                <p className="text-secondary font-semibold mt-4">
                  &mdash; {person.name}
                </p>
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
