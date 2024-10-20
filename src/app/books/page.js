import { database } from "@/utils/dbConnection";
import Link from "next/link";
import Header from "@/components/Header";

export default async function BooksPage({ searchParams }) {
  console.log("searchParams", searchParams);
  const books = await database.query(`SELECT * FROM books`);
  console.log(books);
  const wrangledBooks = books.rows;
  console.log(wrangledBooks);

  //wrangledBooks.sort if (anon function (a,b) a.title.localeCompare(b)// else if the opposite
  if (searchParams.sort === "desc") {
    wrangledBooks.reverse();
  }

  return (
    <>
      <Header />
      <h1 className="flex flex-col items-center">Books we love</h1>
      <h2 className="flex flex-col items-center">
        Click on the book title to see it's reviews and leave your own
      </h2>
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
