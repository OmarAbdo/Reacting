import { QueryClient } from "@tanstack/react-query";
import { getEmployees } from "./service/api/employee";


// This exports a function called userLoader that takes a queryClient parameter and returns an async function.
// This is using a currying pattern - the outer function receives dependencies,
// and the inner function is the actual loader that React Router will call.
// currying is breaking down a function that takes multiple arguments into a sequence of functions that each take a single argument.
export const employeeLoader = (queryClient: QueryClient) => async () => {
    console.log("employeeLoader called");
    const queryKey = ["employees"];
    // Check if the data is already cached in the queryClient
    console.log("Checking cache for employees");
    if (queryClient.getQueryData(queryKey)) {
        console.log("Employees found in cache");
        return queryClient.getQueryData(queryKey);
    }
    console.log("Employees not found in cache, fetching from API");
    // If not cached, fetch the data and cache it. The second argument to fetchQuery is a function that returns a Promise.
    return await queryClient.fetchQuery({ queryKey, queryFn: getEmployees });
}
// the reason why we're using currying here is to allow us to pass the queryClient instance to the loader function.
// as react router is expecting the loader function to be a simple function that takes no arguments,
// React Router wants this signature:
// const loader = async () => {
//     // return data
// };
