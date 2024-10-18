import pg from "pg";

export default async function Connect({ params }) {
  const db = new pg.Pool({
    connectionString: process.env.NEXT_PUBLIC_DATABASE_URL,
  });

  const books = (await db.query(`SELECT * FROM books WHERE id = ${params.id}`))
    .rows;
  const comments = (
    await db.query(
      `SELECT * FROM books JOIN comments ON comments.book_id = books.id WHERE books.id=${params.id}`
    )
  ).rows;

  return (
    <div>
      {books.map((book) => (
        <div key={book.id}>
          <h2>{book.title}</h2>
          <p>{book.author}</p>
          <p>{book.genre}</p>
        </div>
      ))}
      {comments.map((comment) => (
        <div key={comment.id}>
          <p>{comment.name}</p>
          <p>{comment.comment}</p>
        </div>
      ))}
    </div>
  );
}
