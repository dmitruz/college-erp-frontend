const API_URL = "http://127.0.0.1:8000/api";

export interface Course {
    id: number;
    course_code: string;
    course_name: string;
    semester: number;
    credits: number;
}

interface CoursesResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: Course[];
}

export async function getCourses(): Promise<Course[]> {
    const token = localStorage.getItem("access_token");

    const response = await fetch(`${API_URL}/courses/`, {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
    }

    const data: CoursesResponse = await response.json();

    return data.results;
}