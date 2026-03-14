import { redirect } from "next/navigation";

export const metadata = {
  title: "Bestiario - Tonaltlan",
  description: "Seccion en construccion.",
};

export default function BestiarioPage() {
  redirect("https://tonaltlan.com/proximamente/");
}
