import { useLoaderData } from "react-router";
import { Employee } from "../types";

export default function Employlee() {
  const employee = useLoaderData<Employee>();

  return (
    <div>
      <h1>Employee Page</h1>
      <p>This is the employee page content. id number {employee.id}</p>
      {employee ? (
        <div>
          <h2>{employee.name}</h2>
          <p>Position: {employee.position}</p>
        </div>
      ) : (
        <p>Loading employee data...</p>
      )}
    </div>
  );
}
