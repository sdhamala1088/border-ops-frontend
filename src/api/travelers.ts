import apiClient from "./client";
import type { Traveler } from "../types/traveler";

export interface TravelerPage {
    content: Traveler[];
    totalElements: number;
    totalPages: number;
    size: number;
    number: number;
}

export async function fetchTravelers(page = 0, size = 10, name?: string) {
    const params: Record<string, any> = { page, size };
    if (name && name.trim() !== "") {
        params.name = name;
    }

    const response = await apiClient.get<TravelerPage>("/travelers", { params });
    return response.data;
}

export type NewTraveler = Omit<Traveler, "id">;

export async function createTraveler(traveler: NewTraveler) {
    const response = await apiClient.post<Traveler>("/travelers", traveler);
    return response.data;
}