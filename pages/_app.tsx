import "@/styles/globals.css";
import "@/styles/infocard.css";
import "@/styles/searchbar.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
