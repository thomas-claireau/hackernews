import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useState } from "react";

import en from "./locales/en";

const AppContext = createContext();

function AppContextProvider({ children }) {
  const router = useRouter();
  const { locale } = router;
  const [state, setState] = useState([]);

  useEffect(
    () =>
      setState({
        i18n: en,
      }),
    [locale]
  );

  useEffect(() => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
      setState((prevState) => ({ ...prevState, theme: "dark" }));
    } else {
      document.documentElement.classList.remove("dark");
      setState((prevState) => ({ ...prevState, theme: "light" }));
    }
  }, []);

  return <AppContext.Provider value={state}>{children}</AppContext.Provider>;
}

// context consumer hook
const useAppContext = () => {
  // get the context
  const context = useContext(AppContext);

  // if `undefined`, throw an error
  if (context === undefined) {
    throw new Error("useAppContext was used outside of its Provider");
  }

  return context;
};

export { useAppContext, AppContextProvider };
