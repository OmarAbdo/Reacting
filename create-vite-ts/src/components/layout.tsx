import { Outlet } from "react-router";
import { useEffect } from "react";
import Header from "./header.tsx";
export default function Layout() {
  useEffect(() => {
    console.log("A print statement from the inside of a useEffect hook");
    console.log("This layout component has mounted only once");
    return () => {
      console.log("This layout component has unmounted");
    };
  });
  return (
    <div>
      <header>
        <Header />
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <p>© 2025 My Company</p>
      </footer>
    </div>
  );
}
