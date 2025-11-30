import css from "./page.module.css";
import Image from "next/image";
import Link from "next/link";
export default function Home() {
  return (
    <div className={css.hero}>
      <Image
        src="/Picture.jpg"
        alt="Hero"
        fill
        style={{ objectFit: "cover", objectPosition: "center" }}
        priority
      />
      <div className={css.heroContent}>
        <h1 className={css.text}>Find your perfect rental car</h1>
        <p>Reliable and budget-friendly rentals for any journey</p>
        <Link className={css.heroBtn} href={"/catalog"}>
          View Catalog
        </Link>
      </div>
    </div>
  );
}
