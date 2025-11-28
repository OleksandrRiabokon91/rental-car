import Link from "next/link";
export default function Header() {
  return (
    <div className="container">
      <Link href="/">
        {/* <image href="" /> */}
        Logo
      </Link>
      <nav>
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/catalog">Catalog</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
