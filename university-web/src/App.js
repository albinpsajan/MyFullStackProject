import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import StudentPage from './components/StudentPage';
import CoursePage from './components/CoursePage';
import CourseDetails from './components/CourseDetails';
import { Routes, Route, Link } from 'react-router-dom';
import Login from "./components/Login";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="p-4">

      {/* Navigation */}
      {/* <nav>
        <Link to="/">Home</Link> |
        <Link to="/students">Students</Link> |
        <Link to="/courses">Courses</Link> |
        <Link to="/about">About</Link>
      </nav> */}

      <Navbar />
      <Routes>

        {/* Home Page */}
        <Route path="/login" element={<Login />} / >
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />

        {/* Students Page */}
        <Route path="/students" element={<StudentPage />} />

        {/* Courses Page */}
        <Route path="/courses" element={<CoursePage />} />
        <Route path="/courses/:Id" element={<CourseDetails />} />

        {/* About Page */}
        <Route path="/about" element={<About />} />

      </Routes>

    </div>
  );
}

export default App;
