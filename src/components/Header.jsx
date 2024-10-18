import Link from "next/link";

export default function Header() {
  return (
    <>
      <h1>Shelf Talk</h1>
      <nav>
        <Link href="/">Home</Link>
        <Link href="/books">Books</Link>
        {/* <Link href="/about">About</Link>
        <Link href="/contact">Contact</Link> */}
      </nav>
    </>
  );
}
