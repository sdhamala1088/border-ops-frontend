import apiClient from "./client";
import type { Port } from "../types/port";

export async function fetchPorts() {
    const response = await apiClient.get<Port[]>("/ports");
    return response.data;
}

export async function createPort(newPort: NewPort) {
    const response = await apiClient.post<Port>("/ports", newPort);
    return response.data;
}

export type NewPort = Omit<Port, "id">;