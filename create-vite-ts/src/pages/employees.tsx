import { useEffect, useState } from "react";
import { getEmployees } from "../service/api/employee";
import { Employee } from "../types";

export default function Employees() {
  const [employees, setEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    const employeeList = async () => {
      let data;
      try {
        data = await getEmployees();
        setEmployees(data);
      } catch (error) {
        console.log(error);
      }
    };

    employeeList();
  }, []);

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
