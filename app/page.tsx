import type { Metadata } from "next";
import Header from "@/components/Header";
import Image from "next/image";
import Link from "next/link";

import GroupPhoto from "@/public/images/goup_edit.jpg";
import { VISION_SUMMARY } from "@/lib/vision";
import { GIVING_URL } from "@/lib/contactInfo";

// Title and description come from the root layout; only the canonical is
// page-specific (set here so it isn't inherited by pages like the 404).
export const metadata: Metadata = { alternates: { canonical: "/" } };

export default function Home() {
  return(
    <div>
      <Header/>
      <h1 className="sr-only">
        Butterfly Transformation House: Christian Halfway House &amp; Sober Living in Southern Indiana
      </h1>
      {/* Sized to the remaining viewport below the sticky Header (--header-h) so the Apply button is visible with no scroll. */}
      <div className="h-[calc(100dvh-var(--header-h))] flex flex-col">

        <div className="flex-1 flex flex-col xl:flex-row overflow-hidden">

          {/*
            Not using `fill`: it pins the image to 100% of its container, so
            the margin couldn't inset it. Width is "100%/50% minus the margin"
            so the margin doesn't push it into overflow, and xl:self-start
            stops the flex row from stretching it past its natural height.
          */}
          <Image
            src={GroupPhoto}
            alt="Residents and staff of Butterfly Transformation House"
            preload
            sizes="(min-width: 1280px) 50vw, 100vw"
            className="w-[calc(100%-2rem)] h-[26vh] xl:h-auto xl:w-[calc(50%-3rem)] xl:self-start flex-none m-4 xl:m-6 rounded-lg object-cover shadow-lg"
          />

          <div className="flex-1 flex items-center justify-center text-center xl:text-left px-6 xl:px-10">
            <div className="xl:w-2/3">
              <p className="font-serif italic text-foreground text-lg xl:text-3xl leading-relaxed">
                &ldquo;Therefore, if anyone is in Christ, he is a new creation; the old has gone, the new has come.&rdquo;
              </p>
              <p className="text-secondary font-semibold mt-3 xl:mt-5">
                &mdash; II Corinthians 5:17
              </p>
            </div>
          </div>
        </div>

        <div className="nav:hidden flex-none flex justify-center gap-4 pb-6 pt-2">
          <Link
            href="/apply"
            className="rounded-full bg-secondary px-8 py-3 text-lg text-white shadow-lg hover:bg-secondary/90 transition-colors"
          >
            Apply Now
          </Link>
          <Link
            href={GIVING_URL}
            className="rounded-full bg-secondary px-8 py-3 text-lg text-white shadow-lg hover:bg-secondary/90 transition-colors"
          >
            Give
          </Link>
        </div>

      </div>

      {/* Two-column split on xl mirrors the hero's image/verse layout above. */}
      <section className="bg-primary/10 border-t-4 border-accent">
        <div className="mx-auto max-w-5xl px-6 py-12 xl:py-20 flex flex-col xl:flex-row gap-6 xl:gap-12 text-center xl:text-left">
          <div className="xl:w-1/3 flex-none">
            <h2 className="text-3xl xl:text-4xl font-serif text-secondary">Our Vision</h2>
            <div className="w-16 mx-auto xl:mx-0 mt-3 border-b-2 border-accent" />
          </div>
          <div className="flex-1">
            <p className="text-foreground text-lg xl:text-xl leading-relaxed">{VISION_SUMMARY}</p>
            <Link
              href="/program"
              className="inline-block mt-6 rounded-full border-2 border-secondary px-6 py-2 text-secondary font-semibold hover:bg-secondary hover:text-white transition-colors"
            >
              Learn About Our Program
            </Link>
          </div>
        </div>
      </section>

      {/* Plain-language summary of who we serve and where: this is the text
          search engines match for local searches like "sober living New Albany". */}
      <section className="mx-auto max-w-5xl px-6 py-12 xl:py-16 flex flex-col xl:flex-row gap-6 xl:gap-12 text-center xl:text-left">
        <div className="xl:w-1/3 flex-none">
          <h2 className="text-3xl xl:text-4xl font-serif text-secondary">
            Christian Sober Living in Southern Indiana
          </h2>
          <div className="w-16 mx-auto xl:mx-0 mt-3 border-b-2 border-accent" />
        </div>
        <div className="flex-1 space-y-4 text-foreground text-lg leading-relaxed">
          <p>
            Butterfly Transformation House is a faith-based halfway house in Laconia, Indiana, with
            separate homes for men and women in recovery from drug and alcohol addiction. Residents
            live in a safe, Christ-centered community while completing our Stepping into Freedom step
            program, with personal mentorship, weekly recovery meetings, and church fellowship.
          </p>
          <p>
            Located in Harrison County, we welcome men and women from across Southern Indiana,
            including Corydon, New Albany, Jeffersonville, and Clarksville, as well as Louisville and
            the greater Kentuckiana area.
          </p>
          <div className="flex flex-wrap justify-center xl:justify-start gap-4 pt-2">
            <Link
              href="/apply"
              className="rounded-full bg-secondary px-6 py-2 text-white font-semibold hover:bg-secondary/90 transition-colors"
            >
              Apply Now
            </Link>
            <Link
              href="/contact"
              className="rounded-full border-2 border-secondary px-6 py-2 text-secondary font-semibold hover:bg-secondary hover:text-white transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
