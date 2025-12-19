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

type Direction = "ENTRY" | "EXIT";
type Mode = "VEHICLE" | "PEDESTRIAN" | "AIR" | "SEA";