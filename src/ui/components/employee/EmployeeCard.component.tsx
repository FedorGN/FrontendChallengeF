import EmployeeFormatter from "@/core/formatters/employee.formatter";
import { EmployeeModel } from "@/domain/models/employee.model";
import { Card } from "antd";
import { ReactNode } from "react";
export interface EmployeeCardProps {
  employee: EmployeeModel;
}

const EmployeeCard = ({ employee }: EmployeeCardProps): ReactNode => {
  return (
    <Card title="General information" style={{ width: 300 }}>
      <p>Id: {employee.id}</p>
      <p>Name: {employee.employee_name}</p>
      <p>Salary: {EmployeeFormatter.formatSalary(employee.employee_salary)}</p>
    </Card>
  );
};
export default EmployeeCard;
