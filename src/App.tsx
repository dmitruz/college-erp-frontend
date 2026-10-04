import { useEffect, useState } from "react";
import { getCourses } from "./services/api/api";

interface Course {
  id: number;
  name?: string;
  title?: string;
  code?: string;
}

function App() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    getCourses()
      .then((data) => {
        console.log("Courses:", data);
        setCourses(data);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
      });
  }, []);

  return (
    <div>
      <h1>College ERP</h1>

      <h2>Courses</h2>

      {error && <p>{error}</p>}

      {courses.length === 0 && !error && (
        <p>No courses found.</p>
      )}

      {courses.map((course) => (
        <div key={course.id}>
          <p>
            {course.code} - {course.name || course.title}
          </p>
        </div>
      ))}
    </div>
  );
}

export default App;