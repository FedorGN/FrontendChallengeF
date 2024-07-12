import { useDeleteEmployee } from "@/domain/hooks/employee.hook";
import { EmployeeModel } from "@/domain/models/employee.model";
import {
  DeleteOutlined
} from '@ant-design/icons';
import { Button, Form, Modal, notification } from "antd";
import { useState } from "react";

export interface ButtonAndModalDeleteEmployeeProps {
  employee: EmployeeModel;
}

const ButtonAndModalDeleteEmployee = ({ employee }: ButtonAndModalDeleteEmployeeProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { mutate } = useDeleteEmployee();
  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const openSuccesNotification = () => {
    notification.open({
      message: 'Success',
      description:
        `Employee with id=${employee.id} was deleted.`,
      type: 'success',
      placement: 'bottomRight'
    });
  };

  const handleOk = () => {
    mutate(employee.id, {
      onSuccess: () => {
        setIsModalOpen(false);
        openSuccesNotification();
      },
      onError: (error) => {
        console.error('Update failed', error);
      },
    });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button danger onClick={showModal}>
        <DeleteOutlined />
      </Button>
      <Modal title="Delete employee?" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <div>Do confirm deletion of employee {employee.employee_name} with id={employee.id}?</div>
      </Modal>
    </>
  );

};
export default ButtonAndModalDeleteEmployee;