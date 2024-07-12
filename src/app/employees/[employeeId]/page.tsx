"use client";

import { useGetEmployeeById } from "@/domain/hooks/employee.hook";
import ButtonAndModalDeleteEmployee from "@/ui/components/employee/ButtonAndModalDeleteEmployee.component";
import ButtonAndModalEditEmployee from "@/ui/components/employee/ButtonAndModalEditEmployee.component";
import EmployeeCard from "@/ui/components/employee/EmployeeCard.component";
import { H1, PageHeader } from "@/ui/components/Headers";
import { Space } from "antd";
import { usePathname } from "next/navigation";
import { useState } from "react";


/** 
* Page "Employee information"
*/
export default function EditEmployeePage() {
  const pathname = usePathname();
  const [isModalDisplayed, setIsModalDisplayed] = useState(false)
  const pathSegments = pathname.split('/');
  const id = pathSegments[pathSegments.length - 1];
  const { data, isLoading, isError } = useGetEmployeeById(Number(id));
  if (!data) return <div>Loading...</div>;
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading employee</div>;

  return (
    <>
      <PageHeader>
        <H1>Employee</H1>
        <Space>
          <ButtonAndModalEditEmployee employee={data} />
          <ButtonAndModalDeleteEmployee employee={data} />
        </Space>
      </PageHeader>
      <EmployeeCard employee={data} />
    </>
  );
}