import Image from "next/image";
import styles from "./page.module.css";
import EmailSender from "@/app/components/EmailSender";

export default function Home() {
  return (
      <>

      <EmailSender/>
      </>
  );
}
