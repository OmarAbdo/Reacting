// type employee
export type Employee = {
    id: number;
    name: string;
    position: string;
    department: string;
}

// type employee list
export type EmployeeList = Employee[];

export type CreateEmployeeType = {
    name: string;
    position: string;
    department: string;
}

// type goal 
export type Goal = {
    id: number;
    employee_id: string;
    description: string;
    dueDate: string;
    status: string;
}

// type goal list
export type GoalList = Goal[];

// type performance review
export type PerformanceReview = {
    id: number;
    employee_id: string;
    reviewDate: string;
    reviewer: string;
    comments: string;
    rating: number;
}

// type performance review list
export type PerformanceReviewList = PerformanceReview[];