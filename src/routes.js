import { useRoutes } from "react-router-dom"
import { LoginForm } from "./authentication"
import LogoOnlyLayout from "./components/logoOnlyLayout"
import { Dashboard } from "./pages"


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
    //   path: "/overview",
    //   element: <Dashboard />,
    // }
  ])
}
