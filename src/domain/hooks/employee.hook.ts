import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { EmployeeBaseModel, EmployeeModel } from "../models/employee.model";
import EmployeeService from "../services/employee.service";


const service = EmployeeService.getInstance();

export const useGetEmployeeList = () => {
  return useQuery({
    queryKey: ["getEmployeeList"],
    queryFn: () => service.getEmployeeList(),
  });
};


export const useGetEmployeeById = (id: number) => {
  return useQuery({
    queryKey: ["useGetEmployeeById"],
    queryFn: () => service.getEmployeeById({ id })
    ,
  });
};

export const useCreateEmployee = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newEmployee: EmployeeBaseModel) => service.createEmployee(newEmployee),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getEmployeeList"] });
      queryClient.invalidateQueries({ queryKey: ["useGetEmployeeById"] });
    },
  });
};


export const useUpdateEmployee = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: EmployeeModel) => service.updateEmployeeById(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getEmployeeList"] });
      queryClient.invalidateQueries({ queryKey: ["useGetEmployeeById"] });
    },
  });
};



export const useDeleteEmployee = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => service.deleteEmployeeById(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getEmployeeList"] });
      queryClient.invalidateQueries({ queryKey: ["useGetEmployeeById"] });
    },
  });
};
