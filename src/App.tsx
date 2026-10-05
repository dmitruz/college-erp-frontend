import { useEffect, useState } from "react";
import { getCourses } from "./services/api/api";
import LoginForm from "./components/LoginForm";

interface Course {
  id: number;
  course_name?: string;
  title?: string;
  course_code?: string;
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    Boolean(localStorage.getItem("access_token"))
  );

  const [courses, setCourses] = useState<Course[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isAuthenticated) {
      return;
    }

    getCourses()
      .then((data) => {
        console.log("Courses:", data);
        setCourses(data);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
      });
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <LoginForm
        onLogin={() => setIsAuthenticated(true)}
      />
    );
  }

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
            {course.course_code} - {course.course_name || course.title}
          </p>
        </div>
      ))}
    </div>
  );
}

export default App;