import { ThemeProvider } from '@/components/ui/theme-provider';
import { NavBar } from './components/NavBar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import routes from './routes';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <NavBar />
        <header className="pt-4">
          <h1 className="text-center text-3xl font-bold md:text-5xl">
            Deadlock
          </h1>
        </header>
        <main className="flex min-h-screen justify-center px-4 py-8">
          <Routes>
            {routes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={route.element}
              />
            ))}
          </Routes>
        </main>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
