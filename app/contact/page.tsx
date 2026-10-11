import type { Metadata } from "next";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact Butterfly Transformation House, a faith-based halfway house and drug and alcohol rehabilitation program for men and women in Laconia, Indiana.",
};

export default function ContactPage() {
  return <ContactForm />;
}
