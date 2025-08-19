import { Link } from "react-router-dom";
export default function Employees() {
  return (
    <div>
      <h1>Employees</h1>
      <p>This page lists all employees.</p>
      <Link to="/">Go back to Home</Link>
      <Link to="/about">Go to About</Link>
    </div>
  );
}
