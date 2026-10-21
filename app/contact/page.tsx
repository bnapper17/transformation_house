import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import ContactForm from "./ContactForm";

export const metadata: Metadata = pageMetadata({
  path: "/contact",
  title: "Contact Our Southern Indiana Halfway House",
  description:
    "Call or message Butterfly Transformation House in Laconia, Indiana about faith-based sober living for men and women. We serve Harrison, Floyd, and Clark counties, Southern Indiana, and the Louisville, KY area.",
});

export default function ContactPage() {
  return <ContactForm />;
}
