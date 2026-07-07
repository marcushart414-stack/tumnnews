import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Newsroom from './pages/Newsroom';
import Blog from './pages/Blog';
import ArticleDetail from './pages/ArticleDetail';
import Advertise from './pages/Advertise';
import SubmitArticle from './pages/SubmitArticle';
import MemberDashboard from './pages/MemberDashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import BrandPage from './pages/BrandPage';
import Brands from './pages/Brands';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import ResetPassword from './pages/ResetPassword';
import EmailConfirmed from './pages/EmailConfirmed';
import Admin from './pages/admin/Admin';
import AdminAssignments from './pages/admin/AdminAssignments';
import AdminSubmissions from './pages/admin/AdminSubmissions';
import AdminSessions from './pages/admin/AdminSessions';
import AdminMessages from './pages/admin/AdminMessages';
import AcademyOverview from './pages/academy/AcademyOverview';
import AcademyEnroll from './pages/academy/AcademyEnroll';
import PortalLogin from './pages/portal/PortalLogin';
import PortalStudent from './pages/portal/PortalStudent';
import PortalParent from './pages/portal/PortalParent';
import PortalOrganization from './pages/portal/PortalOrganization';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white text-black flex flex-col">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/newsroom" element={<Newsroom />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/article/:slug" element={<ArticleDetail />} />
            <Route path="/advertise" element={<Advertise />} />
            <Route path="/submit-article" element={<SubmitArticle />} />
            <Route path="/dashboard" element={<MemberDashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/brands" element={<Brands />} />
            <Route path="/brand/:brandId" element={<BrandPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/email-confirmed" element={<EmailConfirmed />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/assignments" element={<AdminAssignments />} />
            <Route path="/admin/submissions" element={<AdminSubmissions />} />
            <Route path="/admin/sessions" element={<AdminSessions />} />
            <Route path="/admin/messages" element={<AdminMessages />} />
            <Route path="/academy" element={<AcademyOverview />} />
            <Route path="/academy/enroll" element={<AcademyEnroll />} />
            <Route path="/academy/portal/login" element={<PortalLogin />} />
            <Route path="/academy/portal/student" element={<PortalStudent />} />
            <Route path="/academy/portal/parent" element={<PortalParent />} />
            <Route path="/academy/portal/partner" element={<PortalOrganization />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
