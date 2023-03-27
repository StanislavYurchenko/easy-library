import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import styles from './app.module.scss';
import AppRoot from './components/AppRoot/AppRoot';
import BooksPage from './pages/BooksPage/BooksPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppRoot />,
    children: [
      {
        path: '/home',
        element: <div>Hello home!</div>,
      },
      {
        path: '/about',
        element: <div>Hello about!</div>,
      },
      {
        path: '/books',
        element: <BooksPage />,
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
