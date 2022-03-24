import { onAuthStateChangedState } from "../firebase/clients";
import { useState, useEffect } from "react";

export default function useUser() {
  /**
   * @type {[import("types/context/UserContext").UserAppI,()=>void]}
   */
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChangedState(setUser);
  }, []);

  return user;
}
