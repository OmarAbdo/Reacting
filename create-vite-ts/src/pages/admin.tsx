import { CreateEmployeeType } from "../types";

import { addEmployee } from "../service/api/employee";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const employeeSchema = z.object({
  name: z.string(),
  position: z.string(),
  department: z.string(),
});

export default function Admin() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(employeeSchema), // what is line?
  });

  const submitMutation = useMutation({
    mutationFn: addEmployee,
  });

  const onSubmit = (data: CreateEmployeeType) => {
    console.log("received the following data");
    console.log(data.name, data.department, data.position);
    submitMutation.mutate(data);
  };
  return (
    <div>
      <h1> Admin page. to be password protected with context API</h1>
      <h2>Create a new employee</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("name")} placeholder="Name" />
        {errors.name && <span>{errors.name.message}</span>}
        <input {...register("department")} placeholder="Department" />
        {errors.department && <span>{errors.department.message}</span>}
        <input {...register("position")} placeholder="Position" />
        {errors.position && <span>{errors.position.message}</span>}

        <button type="submit" disabled={submitMutation.isPending}>
          {submitMutation.isPending ? "Creating...." : "Create"}
        </button>
      </form>
    </div>
  );
}
