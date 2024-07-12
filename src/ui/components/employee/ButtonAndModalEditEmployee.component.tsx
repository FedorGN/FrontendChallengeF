import { useUpdateEmployee } from "@/domain/hooks/employee.hook";
import { EmployeeModel } from "@/domain/models/employee.model";
import { Button, Form, Input, InputNumber, Modal, notification } from "antd";
import { useState } from "react";


export interface ButtonAndModalEditEmployeeProps {
  employee: EmployeeModel;
}

type FieldType = {
  name?: string;
  salary?: string;
  age?: string;
};

const ButtonAndModalEditEmployee = ({ employee }: ButtonAndModalEditEmployeeProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { mutate } = useUpdateEmployee();
  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const openSuccesNotification = () => {
    notification.open({
      message: 'Success',
      description:
        `Employee with id=${employee.id} was updated.`,
      type: 'success',
      placement: 'bottomRight'
    });
  };

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        const updatedEmployee = {
          employee_name: values.name || "",
          employee_salary: Number(values.salary),
          employee_age: Number(values.age),
          id: employee.id
        };
        mutate(updatedEmployee, {
          onSuccess: () => {
            setIsModalOpen(false);
            openSuccesNotification();
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

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button type="default" onClick={showModal}>
        Edit
      </Button>
      <Modal title="Edit employee" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Form
          name="basic"
          layout="vertical"
          form={form}
          initialValues={{ name: employee.employee_name, salary: employee.employee_salary, age: employee.employee_age }}
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
      </Modal>
    </>
  );

};
export default ButtonAndModalEditEmployee;