import { useEffect, useState } from "react";
import { getCourses, getCurrentStudent } from "./services/api/api";
import LoginForm from "./components/LoginForm";

interface Course {
  id: number;
  course_name?: string;
  title?: string;
  course_code?: string;
}

interface Student {
  id: number;
  student_id: string;
  date_of_birth: string;
  gender: string;
  phone_number: string;
  address: string;
  admission_date: string;
  profile_picture: string | null;
  is_active: boolean;
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    Boolean(localStorage.getItem("access_token"))
  );

  const [courses, setCourses] = useState<Course[]>([]);
  const [student, setStudent] = useState<Student | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isAuthenticated) {
      return;
    }

    getCurrentStudent()
      .then((data) => {
        console.log("Student:", data);
        setStudent(data);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
      });

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
      {student && (
        <div>
          <h2>Welcome, Student</h2>

          <p>Student ID: {student.student_id}</p>
          <p>Phone: {student.phone_number}</p>
        </div>
      )}

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