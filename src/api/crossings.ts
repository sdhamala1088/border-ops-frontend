import type { Crossing } from "../types/crossing";
import apiClient from "./client";

export interface CrossingPage {
    content: Crossing[];
    totalElements: number;
    totalPages: number;
    size: number;
    number: number;
}

export async function fetchCrossings(page = 0, size = 10, portId?: number, travelerId?: number) {
    const params: Record<string, any> = { page, size };

    if (portId) {
        params.portId = portId;
    }

    if (travelerId) {
        params.travelerId = travelerId;
    }

    const response = await apiClient.get<CrossingPage>("/crossings", { params });
    return response.data;
}

export async function postCrossing(newCrossing: NewCrossing) {
    const response = await apiClient.post<Crossing>("/crossings", newCrossing);
    return response.data;
}

export type NewCrossing = Omit<Crossing, "id" | "travelerName" | "portCode" | "portName">;