import axios from 'axios';
import { Employee } from '../../types';

const API_BASE_URL = 'http://localhost:3000/employees';

export const getEmployees = async (): Promise<Employee[]> => {
    try {
        const response = await axios.get<Employee[]>(API_BASE_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching employees:', error);
        throw error;
    }
}


export const getEmployeeById = async (id: string): Promise<Employee> => {
    try {
        const response = await axios.get<Employee>(`${API_BASE_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching employee by ID:', error);
        throw error;
    }
}

export const addEmployee = async (employee: Employee): Promise<Employee> => {
    try {
        const response = await axios.post<Employee>(API_BASE_URL, employee);
        return response.data;
    } catch (error) {
        console.error('Error adding employee:', error);
        throw error;
    }
}

export const updateEmployee = async (id: string, employee: Employee): Promise<Employee> => {
    try {
        const response = await axios.put<Employee>(`${API_BASE_URL}/${id}`, employee);
        return response.data;
    } catch (error) {
        console.error('Error updating employee:', error);
        throw error;
    }
}

export const deleteEmployee = async (id: string): Promise<void> => {
    try {
        await axios.delete(`${API_BASE_URL}/${id}`);
    } catch (error) {
        console.error('Error deleting employee:', error);
        throw error;
    }
}


