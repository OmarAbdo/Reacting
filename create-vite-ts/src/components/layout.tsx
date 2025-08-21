import { Outlet } from "react-router";
import Header from "./header.tsx";
export default function Layout() {
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
