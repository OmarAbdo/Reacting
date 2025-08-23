import { Link } from 'react-router'

export default function Header() {
  return (
    <div>
      <Link to="/about">Go to About</Link>
      <Link to="/employees">Go to Employees</Link>
      <Link to="/">Go to Home</Link>
      <Link to="/admin"> Admin </Link>
    </div>
  );
}
