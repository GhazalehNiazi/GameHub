import React from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import WelcomePage from "@/pages/onboarding/WelcomePage";
import LoginPage from "@/pages/auth/LoginPage";
import RegisterPage from "@/pages/auth/RegisterPage";
import DashboardPage from "@/pages/dashboard/DashboardPage";
import PlayPage from "@/pages/play/PlayPage";
import NewLeagueWizardPage from "@/pages/play-new-league/NewLeagueWizardPage"; // Path Updated cleanly!
import LeagueDashboardPage from "@/pages/league/LeagueDashboardPage";

export default function App() {
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
