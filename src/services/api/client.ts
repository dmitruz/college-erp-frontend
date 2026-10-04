const API_URL = import.meta.env.VITE_API_URL;

export async function apiGet<T>(endpoint: string): Promise<T> {
    const accessToken = localStorage.getItem("access_token");

    const response = await fetch(`${API_URL}${endpoint}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
    }

    return response.json();
}