"use client";

import { createContext, useState, use } from "react";
import { createFromFetch } from "react-server-dom-webpack/client";

const RouterContext = createContext();
const initialCache = new Map();

export function Router() {
  const [cache] = useState(initialCache);
  const [location] = useState({
    selectedId: null,
    isEditing: false,
    searchText: "",
  });

  const locationKey = JSON.stringify(location);
  let content = cache.get(locationKey);
  console.log(content);
  if (!content) {
    content = createFromFetch(
      fetch("http://localhost:3001/react", {
        headers: {
          mode: "no-cors",
        },
      })
    );
    console.log(content);
    cache.set(locationKey, content);
  }

  return (
    <RouterContext.Provider value="test">{use(content)}</RouterContext.Provider>
  );
}
