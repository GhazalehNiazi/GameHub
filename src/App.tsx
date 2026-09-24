import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import { useAppStore } from "@/shared/store/appStore";
import { WelcomePage } from "@/features/onboarding";
import { LoginPage, RegisterPage } from "@/features/auth";
import { DashboardPage } from "@/features/dashboard";
import { PlayPage } from "@/features/play";
import { NewLeagueWizardPage } from "@/features/new-league";
import { LeagueDashboardPage } from "@/features/league";

export default function App() {
  const theme = useAppStore((state) => state.theme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return (
    <BrowserRouter>
      <div className='mobile-frame'>
        <Routes>
          <Route path='/' element={<WelcomePage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/dashboard' element={<DashboardPage />} />
          <Route path='/play' element={<PlayPage />} />
          <Route path='/play/new-league' element={<NewLeagueWizardPage />} />
          <Route path='/league/:id' element={<LeagueDashboardPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
