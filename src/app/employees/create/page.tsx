"use client";

import { useCreateEmployee } from "@/domain/hooks/employee.hook";
import { H1, PageHeader } from "@/ui/components/Headers";
import { Button, Col, Form, Input, InputNumber, notification, Row } from "antd";
import { useRouter } from "next/navigation";


type FieldType = {
  name?: string;
  salary?: string;
  age?: string;
};


/** 
* Page "Create a new employee"
*/
export default function CreateEmployeePage() {
  const router = useRouter();
  const { mutate } = useCreateEmployee();
  const [form] = Form.useForm();

  const openSuccesNotification = () => {
    notification.open({
      message: 'Success',
      description:
        `New employee was created.`,
      type: 'success',
      placement: 'bottomRight'
    });
  };

  const handleSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        const updatedEmployee = {
          employee_name: values.name || "",
          employee_salary: Number(values.salary),
          employee_age: Number(values.age),
        };
        mutate(updatedEmployee, {
          onSuccess: () => {
            openSuccesNotification();
            router.push("/employees/")
          },
          onError: (error) => {
            console.error('Update failed', error);
          },
        });
      })
      .catch((errorInfo) => {
        console.log('Validation failed:', errorInfo);
      });
  };
  return (
    <>
      <PageHeader>
        <H1>Create a new employee</H1>
      </PageHeader>
      <Row><Col xs={24} sm={18} lg={12} xl={12}>
        <Form
          name="basic"
          layout="vertical"
          form={form}
        // initialValues={{ name: employee.employee_name, salary: employee.employee_salary, age: employee.employee_age }}
        >
          <Form.Item<FieldType>
            label="Name"
            name="name"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item<FieldType>
            label="Salary, €"
            name="salary"
            rules={[{ required: true }]}
          >
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item<FieldType>
            label="Age"
            name="age"
            rules={[{ required: true }]}
          >
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
        </Form>
        <Button type="primary" onClick={handleSubmit}>Create</Button>
      </Col></Row>
    </>
  );
}
