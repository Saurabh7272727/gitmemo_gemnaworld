import React from 'react';
import Navbar from './components/Navbar';
import MainFeatures from './components/MainFeatures';
import AdvancedFeatures from './components/AdvancedFeatures';
import MVPPlan from './components/MVPPlan';
import PitchSection from './components/PitchSection';
import Footer from './components/Footer';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './auth/Login.jsx';
import Signup from './auth/Signup.jsx'
import './App.css';
import AuthPageMain from './pages/layout/AuthPageMain.jsx';
import Server from './pages/Server.jsx';
import GithubDashboard from './pages/GithubDashboard.jsx';
import Homes from './UserGitHub/Home.jsx';
import InvitationPage from './UserGitHub/InvitationPage.jsx';
import Explore from './UserGitHub/Explore.jsx';
import RepoSubmitPage from './pages/CreateRepo.jsx';
import IdeaPortal from './pages/IdeaPortal.jsx';
import TaskManagement from './pages/TaskManagement.jsx';
import Badges from './pages/Badges.jsx';
import SkillGraph from './pages/SkillGraph.jsx';
import OpenInnovationBoard from './pages/OpenInnovationBoard.jsx';
import ContributionCenter from './pages/ContributionCenter.jsx';

const Home = () => {
  return (
    <main className="page-frame">
      <div className="hero-panel px-6 py-12 text-center text-white md:px-10 md:py-16">
        <p className="eyebrow">Student collaboration identity</p>
        <h1 className="mt-4 text-5xl font-bold md:text-6xl">
          GitMemo
        </h1>
        <p className="mx-auto mt-5 max-w-3xl text-lg text-slate-300 md:text-xl">
          Transform ideas into verified collaborative achievements with project structure, GitHub context, and visible proof of work.
        </p>
      </div>
      <div className="mt-10 space-y-10">
        <MainFeatures />
        <AdvancedFeatures />
        <MVPPlan />
        <PitchSection />
      </div>
    </main>
  )
}


{/* <div>AuthHomePage</div>

<a href={`https://github.com/apps/gemnaworld/installations/new?state=${state}`}>
                click me
</a> */}

function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route element={<AuthPageMain />}>
            <Route path='/gemna_gitmemo.html' element={<Homes />} />
            <Route path='/gemna_gitmemo.html/profile' element={<GithubDashboard />} />
            <Route path='/gemna_gitmemo.html/invitation' element={<InvitationPage />} />
            <Route path='/gemna_gitmemo.html/explore' element={<Explore />} />
            <Route path='/gemna_gitmemo.html/create-repo' element={<RepoSubmitPage />} />
            <Route path='/gemna_gitmemo.html/idea-portal' element={<IdeaPortal />} />
            <Route path='/gemna_gitmemo.html/tasks/:projectId' element={<TaskManagement />} />
            <Route path='/gemna_gitmemo.html/contributions' element={<ContributionCenter />} />
            <Route path='/gemna_gitmemo.html/badges' element={<Badges />} />
            <Route path='/gemna_gitmemo.html/badges/:userId' element={<Badges />} />
            <Route path='/gemna_gitmemo.html/skill-graph' element={<SkillGraph />} />
            <Route path='/gemna_gitmemo.html/skill-graph/:userId' element={<SkillGraph />} />
            <Route path='/gemna_gitmemo.html/innovation-board' element={<OpenInnovationBoard />} />
          </Route>
          <Route path='/create-repo' element={<RepoSubmitPage />} />
          <Route path='/server' element={<Server />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
