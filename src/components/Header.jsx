import Link from "next/link";

export default function Header() {
  return (
    <>
      <h1 className="flex flex-col items-center text-4xl">Shelf Talk</h1>
      <nav className="flex justify-around content-around text-3xl">
        <Link href="/" className="">
          Home
        </Link>
        <Link href="/books" className="">
          Books
        </Link>
        {/* <Link href="/about">About</Link>
        <Link href="/contact">Contact</Link> */}
      </nav>
    </>
  );
}
