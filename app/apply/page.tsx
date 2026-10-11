import type { Metadata } from "next";
import ApplyForm from "./ApplyForm";

export const metadata: Metadata = {
  title: "Apply",
  description:
    "Apply to Butterfly Transformation House, a faith-based halfway house and sober living program for men and women overcoming drug and alcohol addiction in Laconia, Indiana.",
};

export default function ApplyPage() {
  return <ApplyForm />;
}
