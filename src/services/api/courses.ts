import { apiGet } from "./client";

export interface Course {
    id: number;
    name: string;
    code: string;
    description?: string;
    credits?: number;
}

export function getCourses() {
    return apiGet<Course[]>("/api/courses/");
}