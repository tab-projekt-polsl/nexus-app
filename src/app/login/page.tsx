import LoginForm from "@/components/auth/LoginForm";
import { EmployeeController } from "@/database/controllers/employee/employee.controller";
import loginEmployeeAction = EmployeeController.loginEmployeeAction;

export default function LoginPage() {
  return <LoginForm loginAction={loginEmployeeAction} />;
}
