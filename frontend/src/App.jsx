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

const Home = () => {
  return (
    <main className="container mx-auto px-4 py-8" >
      <div className="text-center mb-16">
        <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
          GitMemo
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Transform Your Ideas into Verified Collaborative Achievements
        </p>
      </div>
      <MainFeatures />
      <AdvancedFeatures />
      <MVPPlan />
      <PitchSection />
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
      <div className="min-h-screen bg-white">
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