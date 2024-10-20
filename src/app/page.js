import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import bgbooks from "@/../public/bgbooks.jpg";

export default function HomePage() {
  return (
    <>
      <Header />
      <h1 className="flex justify-around items-center text-2xl">
        Welcome to Shelf Talk
      </h1>
      <p className="p-10">
        Discover a world of books, reviews, and recommendations! Whether
        you&apos;re a casual reader or a dedicated bookworm, this is the perfect
        place to explore new titles, revisit old favorites, and share your
        thoughts. Here, you can:
        <ul>
          <li>Browse our growing list of books across all genres.</li>
          <li>Read and leave reviews for the books you&apos;ve read.</li>
          <li>Sort books to find the next great read!</li>
        </ul>
        Join the conversation and let&apos;s build a community of readers who
        love to share, discuss, and discover amazing stories!
      </p>
      <Image
        src={bgbooks}
        alt="books on bookshelf"
        className=". bg-cover"
        placeholder="blur"
      />
      <Footer />
    </>
  );
}
