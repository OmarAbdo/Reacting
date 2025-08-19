import { Link } from "react-router-dom";
export default function about() {
  return (
    <div>
      <h1>Details about an employee</h1>
      <p>This page contains information about our company.</p>
      <Link to="/">Go back to Home</Link>
      <Link to="/employees">Go to Employees</Link>
    </div>
  );
}
