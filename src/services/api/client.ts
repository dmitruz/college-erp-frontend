const API_URL = import.meta.env.VITE_API_URL;

export async function apiGet<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${API_URL}${endpoint}`);

    if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
    }

    return response.json();
}