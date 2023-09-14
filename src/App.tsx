import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login, {action as actionLogin} from './pages/Login';
import RootLayout , {action as rootAction} from './pages/RootLayout';
import ErrorPage from './pages/ErrorPage';
import Home from './pages/Home';
import { actionLogout } from './component/helpers/token';
import JournalEntry from './pages/JournalEntry/Index';
import AddJounralEntry from './pages/JournalEntry/AddJournalEntry';
import ViewJournalEntry, {loader as loadDetailJournal} from './pages/JournalEntry/ViewJournalEntry';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    action: rootAction,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: 'logout',
        action: actionLogout
      },
      {
        path: 'journal-entry',
        children: [
          {
            index: true,
            element: <JournalEntry />,
          },
          {
            path: 'new',
            element: <AddJounralEntry />
          },
          {
            path: ':journalId',
            element: <ViewJournalEntry />,
            loader: loadDetailJournal
          }
        ]
      }
    ]

  },
  {
    path: '/login',
    element: <Login />,
    action: actionLogin
  }
])

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
