import CourseCard from './CourseCard';
import RegistrationForm from './RegistrationForm';
import CourseList from './CourseList';
import SearchBar from './SearchBar';    

function CoursePage() {  
return (      
        <div>

            <h2>Course List</h2>

            <CourseCard
              courseName="Data Structures"
              courseCode="CS201"
              credits={4}
            />

            <CourseCard
              courseName="Database Systems"
              courseCode="CS301"
              credits={3}
            />

            <CourseCard
              courseName="Machine Learning"
              courseCode="CS401"
              credits={5}
            />

            {/* Forms Section */}
            <h2>Student Registration</h2>
            <RegistrationForm />

            <h2>All Courses (Dynamic List)</h2>
            <CourseList />

            <h2>Search courses</h2>
            <SearchBar />
          </div>
        
    );
}
export default CoursePage;