import { Employee } from "../types";
import { useLoaderData } from "react-router";

export default function Employees() {
  const employees = useLoaderData<Employee[]>();

  return (
    <div>
      <h1>Employees</h1>
      <p>This page lists all employees.</p>
      <ul>
        {employees.map((employee) => (
          <li key={employee.id}>
            {employee.name} - {employee.position}
          </li>
        ))}
      </ul>
    </div>
  );
}
