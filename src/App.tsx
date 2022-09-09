import { createContext } from "react";

import CoinCard from "@components/CoinCard/CoinCard";
import PageList from "@components/PageList";
import { useLocalStore } from "@utils/useLocalStore";
import { Routes, Route } from "react-router-dom";

import EssencesStore from "./store/global/EssencesStore";
import GlobalApiStore from "./store/global/GlobalApiStore";
import OpenStore from "./store/global/OpenStore";

export const GlobalApiStoreContext = createContext({
  globalApiStore: new GlobalApiStore(),
});

export const EssencesStoreContext = createContext({
  essencesStore: new EssencesStore(),
});

export const OpenStoreContext = createContext({
  openStore: new OpenStore(),
});

function App() {
  const globalApiStore = useLocalStore(() => new GlobalApiStore());
  const essencesStore = useLocalStore(() => new EssencesStore());
  const openStore = useLocalStore(() => new OpenStore());
  return (
    <GlobalApiStoreContext.Provider value={{ globalApiStore }}>
      <EssencesStoreContext.Provider value={{ essencesStore }}>
        <OpenStoreContext.Provider value={{ openStore }}>
          <Routes>
            <Route path="/" element={<PageList />} />
            <Route path="/:id" element={<CoinCard />} />
          </Routes>
        </OpenStoreContext.Provider>
      </EssencesStoreContext.Provider>
    </GlobalApiStoreContext.Provider>
  );
}

export default App;
