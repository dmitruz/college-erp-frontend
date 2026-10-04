const API_URL = import.meta.env.VITE_API_URL

interface LoginResponse {
    access: string;
    refresh: string;
}

export async function login(
    username: string,
    password: string
): Promise<LoginResponse> {
    const response = await fetch(`${API_URL}/token/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username,
            password,
        }),
    });

    if (!response.ok) {
        throw new Error("Invalid username or password");
    }

    const data: LoginResponse = await response.json();

    localStorage.setItem("access_token", data.access);
    localStorage.setItem("refresh_token", data.refresh);

    return data;
}