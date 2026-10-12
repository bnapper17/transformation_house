import Header from "@/components/Header";
import Image from "next/image";
import Link from "next/link";

import GroupPhoto from '@/public/images/goup_edit.jpg'

export default function Home() {
  return(
    <div>
      <Header/>
      {/* Sized to the remaining viewport below the sticky Header (10dvh / 15dvh) so the Apply button is visible with no scroll. */}
      <div className="h-[90dvh] md:h-[85dvh] flex flex-col">

        <div className="flex-1 flex flex-col xl:flex-row overflow-hidden">

          {/*
            No `fill` here: Next.js locks `fill` images to exactly 100%x100%
            of their container (overriding width/height via style throws,
            and margin/padding can't inset an absolutely-positioned 100%
            box either). A normal sized <Image> behaves like any block
            element, so margin/object-fit/height just work. xl:self-start
            opts out of the flex row's default stretch, which would otherwise
            force h-auto to fill the full row height regardless of the
            image's real aspect ratio. Width is explicitly `100%/50% minus
            the margin` (not w-full/w-1/2) so the margin insets the image
            instead of adding on top and overflowing — at xl that overflow
            was invisibly absorbed by the text column shrinking, but on
            mobile the image is stacked alone with nothing to absorb it.
          */}
          <Image
            src={GroupPhoto}
            alt="Group Photo"
            priority
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
            href="/giving"
            className="rounded-full bg-secondary px-8 py-3 text-lg text-white shadow-lg hover:bg-secondary/90 transition-colors"
          >
            Give
          </Link>
        </div>

      </div>
    </div>
  )
};