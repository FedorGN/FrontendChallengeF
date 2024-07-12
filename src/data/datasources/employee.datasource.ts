import EmployeeDatasourceContract from "@/domain/contracts/employeeDatasource.contract";
import {
  EmployeeListModel,
  EmployeeListSchema,
  EmployeeModel,
  EmployeeSchema,
} from "@/domain/models/employee.model";
import { GetEmployeeByIdParams } from "@/domain/params/employee.param";

export default class EmployeeDatasource extends EmployeeDatasourceContract {
  public async getEmployeeList(): Promise<EmployeeListModel | undefined> {
    try {
      // return fakeDataList;
      const response = await fetch(
        "https://dummy.restapiexample.com/api/v1/employees",
      );
      if (response.status !== 200) {
        return undefined;
      }
      const json = await response.json();
      const data = json["data"];

      return EmployeeListSchema.parse(data);
    } catch (exception) {
      return undefined;
    }
  }

  public async createEmployee(
    bodyData: { name: string; salary: string; age: string },
  ): Promise<EmployeeModel | undefined> {
    try {
      const response = await fetch("https://dummy.restapiexample.com/api/v1/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(bodyData)
      });
      if (response.status !== 200) {
        return undefined;
      }
      const json = await response.json();
      const data = json["data"];
      return EmployeeSchema.parse(data);
    } catch (exception) {
      return undefined;
    }
  }

  public async getEmployeeById(
    params: GetEmployeeByIdParams,
  ): Promise<EmployeeModel | undefined> {
    // return fakeDataEmpoyee;
    try {
      const response = await fetch(
        `https://dummy.restapiexample.com/api/v1/employee/${params.id}`,
      );
      if (response.status !== 200) {
        return undefined;
      }
      const json = await response.json();
      const data = json["data"];
      return EmployeeSchema.parse(data);
    } catch (exception) {
      return undefined;
    }
  }

  public async updateEmployeeById(
    employeeData: { name: string; salary: string; age: string, id: number },
  ): Promise<EmployeeModel | undefined> {
    const { id, ...dataWithoutId } = employeeData;
    try {
      const response = await fetch(`https://dummy.restapiexample.com/api/v1/update/${employeeData.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(dataWithoutId)
      });
      if (response.status !== 200) {
        return undefined;
      }
      const json = await response.json();
      const data = json["data"];
      return EmployeeSchema.parse(data);
    } catch (exception) {
      return undefined;
    }
  }

  public async deleteEmployeeById(
    id: number,
  ): Promise<number | undefined> {
    try {
      const response = await fetch(`https://dummy.restapiexample.com/api/v1/delete/${id}`, {
        method: "DELETE"
      });
      if (response.status !== 200) {
        return undefined;
      }
      return id;
    } catch (exception) {
      return undefined;
    }

  }
}

// Fake data used for development in order to not reach API limits.
const fakeDataList = [
  {
    "id": 1,
    "employee_name": "Tiger Nixon",
    "employee_salary": 320800,
    "employee_age": 61,
    "profile_image": ""
  },
  {
    "id": 2,
    "employee_name": "Garrett Winters",
    "employee_salary": 170750,
    "employee_age": 63,
    "profile_image": ""
  },
  {
    "id": 3,
    "employee_name": "Ashton Cox",
    "employee_salary": 86000,
    "employee_age": 66,
    "profile_image": ""
  },
  {
    "id": 4,
    "employee_name": "Cedric Kelly",
    "employee_salary": 433060,
    "employee_age": 22,
    "profile_image": ""
  },
  {
    "id": 5,
    "employee_name": "Airi Satou",
    "employee_salary": 162700,
    "employee_age": 33,
    "profile_image": ""
  },
  {
    "id": 6,
    "employee_name": "Brielle Williamson",
    "employee_salary": 372000,
    "employee_age": 61,
    "profile_image": ""
  },
  {
    "id": 7,
    "employee_name": "Herrod Chandler",
    "employee_salary": 137500,
    "employee_age": 59,
    "profile_image": ""
  },
  {
    "id": 8,
    "employee_name": "Rhona Davidson",
    "employee_salary": 327900,
    "employee_age": 55,
    "profile_image": ""
  },
  {
    "id": 9,
    "employee_name": "Colleen Hurst",
    "employee_salary": 205500,
    "employee_age": 39,
    "profile_image": ""
  },
  {
    "id": 10,
    "employee_name": "Sonya Frost",
    "employee_salary": 103600,
    "employee_age": 23,
    "profile_image": ""
  },
  {
    "id": 11,
    "employee_name": "Jena Gaines",
    "employee_salary": 90560,
    "employee_age": 30,
    "profile_image": ""
  },
  {
    "id": 12,
    "employee_name": "Quinn Flynn",
    "employee_salary": 342000,
    "employee_age": 22,
    "profile_image": ""
  },
  {
    "id": 13,
    "employee_name": "Charde Marshall",
    "employee_salary": 470600,
    "employee_age": 36,
    "profile_image": ""
  },
  {
    "id": 14,
    "employee_name": "Haley Kennedy",
    "employee_salary": 313500,
    "employee_age": 43,
    "profile_image": ""
  },
  {
    "id": 15,
    "employee_name": "Tatyana Fitzpatrick",
    "employee_salary": 385750,
    "employee_age": 19,
    "profile_image": ""
  },
  {
    "id": 16,
    "employee_name": "Michael Silva",
    "employee_salary": 198500,
    "employee_age": 66,
    "profile_image": ""
  },
  {
    "id": 17,
    "employee_name": "Paul Byrd",
    "employee_salary": 725000,
    "employee_age": 64,
    "profile_image": ""
  },
  {
    "id": 18,
    "employee_name": "Gloria Little",
    "employee_salary": 237500,
    "employee_age": 59,
    "profile_image": ""
  },
  {
    "id": 19,
    "employee_name": "Bradley Greer",
    "employee_salary": 132000,
    "employee_age": 41,
    "profile_image": ""
  },
  {
    "id": 20,
    "employee_name": "Dai Rios",
    "employee_salary": 217500,
    "employee_age": 35,
    "profile_image": ""
  },
  {
    "id": 21,
    "employee_name": "Jenette Caldwell",
    "employee_salary": 345000,
    "employee_age": 30,
    "profile_image": ""
  },
  {
    "id": 22,
    "employee_name": "Yuri Berry",
    "employee_salary": 675000,
    "employee_age": 40,
    "profile_image": ""
  },
  {
    "id": 23,
    "employee_name": "Caesar Vance",
    "employee_salary": 106450,
    "employee_age": 21,
    "profile_image": ""
  },
  {
    "id": 24,
    "employee_name": "Doris Wilder",
    "employee_salary": 85600,
    "employee_age": 23,
    "profile_image": ""
  }
]

const fakeDataEmpoyee = {
  "id": 1,
  "employee_name": "Tiger Nixon",
  "employee_salary": 320800,
  "employee_age": "61",
  "profile_image": ""
}