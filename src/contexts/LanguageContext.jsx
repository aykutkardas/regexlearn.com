import * as React from "react";

const Context = React.createContext();

function Provider({ children, lang, setLang }) {
  return (
    <Context.Provider value={{ lang, setLang }}>{children}</Context.Provider>
  );
}

export { Provider, Context };
