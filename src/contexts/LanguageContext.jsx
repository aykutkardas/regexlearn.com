import { createContext } from 'react';

const Context = createContext();

function Provider({ children, lang, setLang }) {
  return <Context.Provider value={{ lang, setLang }}>{children}</Context.Provider>;
}

export { Provider, Context };
