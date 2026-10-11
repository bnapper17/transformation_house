import type { Metadata } from "next";
import GivingForm from "./GivingForm";

export const metadata: Metadata = {
  title: "Give",
  description:
    "Support Butterfly Transformation House, a non-profit faith-based halfway house helping men and women overcome drug and alcohol addiction in Laconia, Indiana.",
};

export default function GivingPage() {
  return <GivingForm />;
}
