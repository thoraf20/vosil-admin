import { Navigate, useRoutes } from "react-router-dom"
import { LoginForm } from "./authentication"
import LogoOnlyLayout from "./components/logoOnlyLayout"

export default function Router() {
  return useRoutes([
    {
      path: "/",
      element: <LogoOnlyLayout />,
      children: [
        {path: "/login", element: <LoginForm />}
      ]
    }
  ])
}