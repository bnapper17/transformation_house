import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import ApplyForm from "./ApplyForm";

export const metadata: Metadata = pageMetadata({
  path: "/apply",
  title: "Apply for Christian Sober Living",
  description:
    "Apply to Butterfly Transformation House, a Christ-centered halfway house and sober living program for men and women overcoming drug and alcohol addiction in Southern Indiana, near Corydon, New Albany, and Louisville.",
});

export default function ApplyPage() {
  return <ApplyForm />;
}
