import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { apiUrl } from '../config';

function LiveStudentList() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // 1. Define the async function
    const fetchData = async () => {
      try {
        // 2. Make the request
        const res = await axios.get(apiUrl('/academic/api/students/'));

        // 3. Update State (Axios puts data inside .data)
        setStudents(res.data);
      } catch (err) {
        console.error("Error connecting to Django:", err);

        if (err.response?.status === 401 || err.response?.status === 403) {
          setError("Please log in to view the student list.");
        } else {
          setError("Could not load students. Is the Django server running?");
        }
      } finally {
        // Stop the loading spinner even when the request fails
        setLoading(false);
      }
    };
    // 4. Call it
    fetchData();

  }, []);

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Students (Live from Django)
      </h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading students...</p>
      ) : error ? (
        <p className="text-center text-red-600">{error}</p>
      ) : students.length === 0 ? (
        <p className="text-center text-gray-500">No students found</p>
      ) : (
        students.map(s => (
          <div
            key={s.id}
            className="bg-white border border-black p-4 my-3 rounded-xl shadow hover:shadow-lg transition"
          >
            <h3 className="text-lg font-semibold">
              {s.first_name} {s.last_name}
            </h3>
            <p className="text-gray-600 text-sm mt-1">
              {s.email}
            </p>
          </div>
        ))
      )}
    </div>
  );
}

export default LiveStudentList;
