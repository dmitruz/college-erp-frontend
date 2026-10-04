const API_URL = "http://127.0.0.1:8000/api";

export async function getCourses() {
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

    return response.json();
}