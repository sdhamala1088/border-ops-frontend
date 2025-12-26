export interface Crossing {
    id: number;
    travelerId: number;
    travelerName: string;
    portId: number;
    portCode: string;
    portName: string;
    direction: Direction;
    mode: Mode;
    crossingTime: string;
    vehiclePlate?: string | null;
    notes?: string | null;
}

export type Direction = "ENTRY" | "EXIT";
export type Mode = "VEHICLE" | "PEDESTRIAN" | "AIR" | "SEA";