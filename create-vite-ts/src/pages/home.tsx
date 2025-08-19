import { Link } from "react-router";
export default function Home() {
  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <p>This is a simple home page component.</p>
      <Link to="/about">Go to About</Link>
      <Link to="/employees">Go to Employees</Link>
    </div>
  );
}
