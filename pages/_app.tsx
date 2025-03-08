import "@/styles/globals.css";
import "@/styles/pokedex-page/infocard.css";
import "@/styles/pokedex-page/searchbar.css";
import "@/styles/pokedex-page/pokedex.css";
import "@/styles/pokedex-page/dpad.css";
import "@/styles/navbar.css";
import "@/styles/login-register-pages/login.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
