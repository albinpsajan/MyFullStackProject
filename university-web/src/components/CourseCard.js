import React from 'react';

function CourseCard(props) {
  return (
    <div
      className="course-card"
      style={{ border: '1px solid #ccc', padding: '10px', margin: '10px' }}
    >
      <h3>{props.courseName}</h3>
      <p>Code: {props.courseCode}</p>
      <p>Credits: {props.credits}</p>
      
      {props.credits > 3?(
        <span style={{color:'red'}}>
            Heavly Workload
        </span>
      ) : null}

    </div>
  );
}

export default CourseCard;