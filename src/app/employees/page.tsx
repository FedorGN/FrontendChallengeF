"use client";

import EmployeeFormatter from "@/core/formatters/employee.formatter";
import { useGetEmployeeList } from "@/domain/hooks/employee.hook";
import { EmployeeModel } from "@/domain/models/employee.model";
import ButtonAndModalDeleteEmployee from "@/ui/components/employee/ButtonAndModalDeleteEmployee.component";
import ButtonAndModalEditEmployee from "@/ui/components/employee/ButtonAndModalEditEmployee.component";
import { H1, PageHeader } from "@/ui/components/Headers";
import { Button, Flex, Table } from "antd";
import { useRouter } from 'next/navigation';

/** 
* Page "Employees list"
*/
export default function EmployeesListPage() {
  const { data, isLoading, isError } = useGetEmployeeList();
  const router = useRouter();

  const handleClickEmployeeDetailsButton = (employeeId: number) => {
    router.push(`/employees/${employeeId}`);
  };

  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
      sorter: (a: EmployeeModel, b: EmployeeModel) => a.id - b.id,
    },
    {
      title: 'Name',
      dataIndex: 'employee_name',
      key: 'employee_name',
    },
    {
      title: 'Salary',
      dataIndex: 'employee_salary',
      key: 'employee_salary',
      render: (text: any, record: EmployeeModel) => EmployeeFormatter.formatSalary(record.employee_salary),
      sorter: (a: EmployeeModel, b: EmployeeModel) => a.employee_salary - b.employee_salary,
    },
    {
      title: '',
      key: 'actions',
      render: (text: any, record: EmployeeModel) =>
        <Flex justify='flex-end' align='center' gap='middle'>
          <Button onClick={() => handleClickEmployeeDetailsButton(record.id)}>Details</Button>
          <ButtonAndModalEditEmployee employee={record} />
          <ButtonAndModalDeleteEmployee employee={record} />
        </Flex>,
    },
  ];

  return (
    <>
      <PageHeader>
        <H1>Employee List {data && <span>({data.length})</span>}</H1>
        <Button type="primary" onClick={() => router.push('/employees/create')}>Create new employee</Button>
      </PageHeader>
      <Table
        dataSource={data}
        columns={columns}
        loading={isLoading}
      />
      {!data && !isLoading && isError && (
        <div>
          <span>error</span>
        </div>
      )}
    </>
  );
}
