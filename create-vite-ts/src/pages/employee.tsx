import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { getEmployeeById } from "../service/api/employee";
import { Employee } from "../types";

export default function Employlee() {
  const { id } = useParams();
  // const { id } = useParams<{ id: string }>(); // or with a cute generic type
  const [employee, setEmployee] = useState<Employee>();

  useEffect(() => {
    const getEmployee = async () => {
      if (!id) {
        console.error("No ID provided");
        return;
      }

      try {
        const result = await getEmployeeById(id);
        console.log("Employee data:", result);
        setEmployee(result);
      } catch (error) {
        console.log(error);
      }
    };

    getEmployee();
  }, [id]);

  return (
    <div>
      <h1>Employee Page</h1>
      <p>This is the employee page content. id number {id}</p>
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
