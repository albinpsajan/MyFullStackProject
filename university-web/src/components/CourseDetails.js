import { useParams } from "react-router-dom";

function CourseDetails() {
    const { Id } = useParams();
    return (
        <div>
            <h2>Course Details</h2>
            <p>Course ID: {Id}</p>
        </div>
    );
}

export default CourseDetails;