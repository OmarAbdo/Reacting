import { useParams } from "react-router";
export default function Employlee() {
  const { id } = useParams();
  // const { id } = useParams<{ id: string }>(); // or with a cute generic type
  return (
    <div>
      <h1>Employee Page</h1>
      <p>This is the employee page content. id number {id}</p>
    </div>
  );
}
