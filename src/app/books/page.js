// import Image from "next/image";
// import coasterroller from "@/../public/coasterroller.jpg";

import { db } from "@/utils/dbConnection";
import Link from "next/link";

export default async function BooksPage() {
  const books = await db.query(`SELECT * FROM books`);
  console.log(books);
  const wrangledBooks = books.rows;

  return (
    <>
      <h1>List of Books</h1>
      <h2>The fun never ends!</h2>
      {/* <Image
        src={coasterroller}
        alt="Coaster roller"
        width={500}
        height={300}
        className="rounded-lg border-amber-400 border-8 hover:scale-105"
        placeholder="blur"
      /> */}
      {wrangledBooks.map((books) => (
        <div
          key={books.id}
          className="border-lime-400 border-2 hover:scale-105 flex flex-col items-center"
        >
          <Link href={`/books/${books.id}`}>{books.title}</Link>
        </div>
      ))}
      {/* <Image
        src="https://images.unsplash.com/photo-1465996140498-df84be101126?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Coaster roller"
        width={500}
        height={300}
        className="rounded-lg border-amber-400 border-4 hover:scale-105"
      /> */}
    </>
  );
}
