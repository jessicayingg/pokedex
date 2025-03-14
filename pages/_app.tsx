import "@/styles/globals.css";
import "@/styles/pokedex-page/infocard.css";
import "@/styles/pokedex-page/searchbar.css";
import "@/styles/pokedex-page/pokedex.css";
import "@/styles/pokedex-page/dpad.css";
import "@/styles/navbar.css";
import "@/styles/login-register-pages/login.css";
import "@/styles/pokemontypes.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />{" "}
    </SessionProvider>
  );
}
