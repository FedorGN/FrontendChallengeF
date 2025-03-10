import { z } from "zod";

export const EmployeeIdSchema = z.number().positive();
export type EmployeeIdModel = z.infer<typeof EmployeeIdSchema>;

export const EmployeeNameSchema = z.string().min(1);
export type EmployeeNameModel = z.infer<typeof EmployeeNameSchema>;

export const EmployeeSalarySchema = z.number().positive();
export type EmployeeSalaryModel = z.infer<typeof EmployeeSalarySchema>;

export const EmployeeAgeSchema = z.number().positive();
export type EmployeeAgeModel = z.infer<typeof EmployeeAgeSchema>

export const EmployeeBaseSchema = z.object({
  employee_name: EmployeeNameSchema,
  employee_salary: EmployeeSalarySchema,
  employee_age: EmployeeAgeSchema,
});
export type EmployeeBaseModel = z.infer<typeof EmployeeBaseSchema>;

export const EmployeeSchema = EmployeeBaseSchema.extend({
  id: EmployeeIdSchema,
});
export type EmployeeModel = z.infer<typeof EmployeeSchema>;

export const EmployeeListSchema = EmployeeSchema.array();
export type EmployeeListModel = z.infer<typeof EmployeeListSchema>;
