import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {ToDoListProvider} from "./components/store/ToDoListStore.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <ToDoListProvider>
          <App />
      </ToDoListProvider>
  </StrictMode>,
)
