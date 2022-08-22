import { useRoutes } from "react-router-dom"
import { LoginForm } from "./authentication"
// import RequestReset from "./authentication/requestResetForm"



export default function Router() {
  return useRoutes([
    {
      path: "/",
      element: <LoginForm />,
      children: [
        {path: "/login", element: <LoginForm />}
      ],
    },
    // {
    //   path: "/reset_password",
    //   element: <RequestReset />,
    // }
  ])
}
