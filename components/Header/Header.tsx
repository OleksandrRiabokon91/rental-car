"use client"; // важно!

import css from "./Header.module.css";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname(); // получаем текущий путь

  const menu = [
    { name: "Home", href: "/" },
    { name: "Catalog", href: "/catalog" },
  ];

  return (
    <div className="container">
      <nav className={css.navBox}>
        <Link href="/">
          <Image src="/Logo.svg" alt="Logo" width="104" height="16" />
        </Link>

        <ul className={css.navList}>
          {menu.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={pathname === item.href ? css.active : ""}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
