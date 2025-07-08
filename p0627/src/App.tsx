import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { CmpTestPage } from './pages/CmpTestPage'
import { LoginPage} from './pages/LoginPage'
import { MainLayout } from './layout/MainLayout';
import { TodoListPage } from './pages/TodoListPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <LoginPage/>
    )
  },
  {
    path: "main",
    element: <MainLayout/>,
    children:[
      {
        path: "cmpTest",
        element:(
          <CmpTestPage/>
        )
      },
      {
        path: "todoList",
        element: (
          <TodoListPage/>
        )
      }
    ]
  }
])

function App() : JSX.Element {
  
  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
