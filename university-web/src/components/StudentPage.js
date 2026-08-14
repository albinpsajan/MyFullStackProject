

import Header from './Header';
//import StudentCard from './StudentCard';
import Counter from './Counter';
//import StudentList from './StudentList';
import TitleUpdater from './TitleUpdater';
import Clock from './Clock';
import UserGreeting from './UserGreeting';
import LiveStudentList from './LiveStudentList';

function StudentPage() {
  return (
    <div>

            {/* login status */}
            <UserGreeting isLoggedIn={true} />
            {/* <UserGreeting isLoggedIn={false} /> */}

            <Header />

            {/* <h2>Current Students</h2> */}

            {/* Reusing the same component with different data */}
            {/* <StudentCard
              name="Alice Wonderland"
              studentId="S001"
              major="Computer Science"
            />
 */}

            {/* <StudentCard
              name="Bob Builder"
              studentId="S002"
              major="Civil Engineering"
            />
 */}

            {/* <StudentCard
              name="Charlie Chocolate"
              studentId="S003"
              major="Culinary Arts"
            />
 */}

            {/* useEffect Demo */}
            <h2>Student Data (API Simulation)</h2>
            <LiveStudentList />

            {/* Counter Section (Session-1 Demo)-useState */}
            <h2>Attendance Counter</h2>
            <Counter />

            {/* Title Updater -useEffect (on change) */}
            <h2>Click Tracker (Updates Tab Title)</h2>
            <TitleUpdater />

            {/* Digital Clock (Lab)-useEffect (continuous running) */}
            <h2>Live Digital Clock</h2>
            <Clock />

          </div>
        );
}

export default StudentPage;