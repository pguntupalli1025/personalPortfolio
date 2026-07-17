import type { Metadata } from "next";
import { ResumeView } from "@/components/ResumeView";

export const metadata: Metadata = {
  title: "Resume",
};

export default function ResumePage() {
  return <ResumeView />;
}
