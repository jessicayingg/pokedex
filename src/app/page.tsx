import Image from "next/image";
import Link from 'next/link';

export default function Home() {
  return (
    <div className="">
      <h1>Welcome to the Homepage!</h1>
      <button>
              <Link href="/page">Go to Another Page</Link>
      </button>
    </div>
  );
}
