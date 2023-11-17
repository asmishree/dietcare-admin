import  { useEffect, useState } from 'react'
import Dashboard from './components/Dashboard/DashboardLayout'
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Home } from './pages/home';
import { Login } from './pages/auth';
import { Toaster } from "react-hot-toast";
import BlogList from './pages/blog/BlogList';
import CreateBlog from './pages/blog/CreateBlog';
import EditBlog from './pages/blog/EditBlog';
import DietList from './pages/diet/DietList';
import CreateDiet from './pages/diet/CreateDiet';
import EditDiet from './pages/diet/EditDiet';

function App() {
  const [theme, colorMode]: any = useMode();
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    setIsLoggedIn(!!authToken);

    if (!authToken) {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div>
      <ColorModeContext.Provider value={colorMode}>

        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Toaster />

          {isLoggedIn ?
            <Dashboard>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/blog" element={<BlogList />} />
                <Route path="/blog/create" element={<CreateBlog />} />
                <Route path="/blog/edit/:id" element={<EditBlog />} />


                <Route path="/diet" element={<DietList />} />
                <Route path="/diet/create" element={<CreateDiet />} />
                <Route path="/diet/edit/:id" element={<EditDiet />} />
      
                <Route path="*" element={<div>NotFound</div>} />
              </Routes>
            </Dashboard> 
            
            :

            <Routes>
              <Route path="/login" element={<Login />} />
            </Routes>
            }
        </ThemeProvider>
        
      </ColorModeContext.Provider>
    </div>
  )
}

export default App