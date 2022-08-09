import Head from "next/head";
import { useRouter } from "next/router";
import { AppContextProvider } from "../AppContext";
import "../styles/globals.css";
import { ThemeProvider } from "next-themes";

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  const locales = router?.locales;
  const locale = router?.locale;

  const langs = locales.filter((lang) => lang !== locale);

  return (
    <AppContextProvider>
      <Head>
        {langs.map((lang) => (
          <link key={lang} rel="alternate" hrefLang={lang} href={`/${lang}`} />
        ))}
      </Head>
      <ThemeProvider defaultTheme="dracula">
        <Component {...pageProps} />
      </ThemeProvider>
    </AppContextProvider>
  );
}

export default MyApp;
