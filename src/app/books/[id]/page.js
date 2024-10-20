import pg from "pg";
import Header from "@/components/Header";
import { database } from "@/utils/dbConnection";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import Footer from "@/components/Footer";

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

  async function handleSubmit(formValues) {
    "use server";
    formValues = {
      name: formValues.get("name"),
      comment: formValues.get("comment"),
    };
    console.log(formValues);

    await database.query(
      `INSERT INTO comments (name, comment, book_id) VALUES ($1, $2, $3)`,
      [formValues.name, formValues.comment, params.id]
    );
    revalidatePath(`/books/${params.id}`);
    redirect(`/books/${params.id}`);
  }

  // async function removeComment(commentID) {
  //   "use server";
  //   await database.query(`DELETE FROM comments WHERE id = $1 RETURNING *`, [
  //     commentId,
  //   ]);
  //   // revalidatePath(`/books/${params.id}`);
  //   // redirect(`/books/${params.id}`);
  // }

  async function handleDelete(formData) {
    "use server";
    formData = {
      delete: formData.get("delete"),
    };
    await database.query(`DELETE FROM comments WHERE id = $1 RETURNING *`, [
      formData.delete,
    ]);
    revalidatePath(`/books/${params.id}`);
    redirect(`/books/${params.id}`);
  }

  return (
    <div>
      <Header />
      {books.map((book) => (
        <div key={book.id} className="p-20">
          <h2>TITLE: {book.title}</h2>
          <p>AUTHOR: {book.author}</p>
          <p>GENRE: {book.genre}</p>
        </div>
      ))}
      {comments.map((comment) => (
        <div
          key={comment.id}
          className="rounded-lg border-2 gap-y-4 hover:gap-y-6"
        >
          <p className="flex justify-end m-2">{comment.id}</p>
          <p className="flex justify-center w-full">{comment.name}</p>
          <p className="flex justify-center w-full">{comment.comment}</p>
        </div>
      ))}
      <form action={handleSubmit} className="flex flex-col items-center p-10">
        <p>If you would like to leave a review please enter the following:</p>
        <label htmlFor="name">Your name:</label>
        <input type="text" id="name" name="name" required />
        <label htmlFor="comment">Your comments:</label>
        <input type="text" id="comment" name="comment" required />
        <button
          type="submit"
          className="border-rose-400 border-4 bg-yellow-600 text-rose-600 p-2 m-3"
        >
          Submit
        </button>
      </form>
      <form action={handleDelete} className="flex flex-col items-center">
        <label htmlFor="delete">Enter your comment number to delete:</label>
        <input type="INT" id="delete" name="delete" required />
        <button
          type="submit"
          className="border-rose-400 border-4 bg-yellow-600 text-rose-600 p-2 m-3"
        >
          Delete
        </button>
        <p>
          (your comment number can be found in the right-hand-corner of your
          comment)
        </p>
      </form>
      <Footer />
    </div>
  );
}

//add comments form to this page
