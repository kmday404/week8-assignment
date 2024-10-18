import { db } from "@/utils/dbConnection";
import Link from "next/link";

export default async function BooksPage({ searchParams }) {
  console.log("searchParams", searchParams);
  const books = await db.query(`SELECT * FROM books`);
  console.log(books);
  const wrangledBooks = books.rows;
  console.log(wrangledBooks);

  if (searchParams.sort === "desc") {
    wrangledBooks.reverse();
  }

  return (
    <>
      <h1>List of Books</h1>
      <h2>The fun never ends!</h2>
      <Link href="/books?sort=asc">Sort ascending</Link> -{" "}
      <Link href="/books?sort=desc">Sort descending</Link>
      {wrangledBooks.map((books) => (
        <div
          key={books.id}
          className="border-white-400 border-2 hover:scale-105 flex flex-col items-center"
        >
          <Link href={`/books/${books.id}`}>{books.title}</Link>
        </div>
      ))}
    </>
  );
}
