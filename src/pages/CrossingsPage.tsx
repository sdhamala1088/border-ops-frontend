import { useEffect, useState, type FormEvent } from "react";
import { type Crossing, type Direction, type Mode } from "../types/crossing";
import { fetchCrossings, postCrossing, type CrossingPage, type NewCrossing } from "../api/crossings";
import { Link } from "react-router-dom";

function CrossingsPage() {

    const [crossings, setCrossings] = useState<Crossing[]>([]);
    const [travelerId, setTravelerId] = useState<string>("");
    const [portId, setPortId] = useState<string>("");
    const [direction, setDirection] = useState<Direction>("ENTRY");
    const [mode, setMode] = useState<Mode>("VEHICLE");
    const [crossingTime, setCrossingTime] = useState<string>("");
    const [vehiclePlate, setVehiclePlate] = useState<string>("");
    const [notes, setNotes] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleCreate = async (e: FormEvent) => {

        e.preventDefault();
        setError(null);

        if (!crossingTime.trim() || !travelerId.trim() || !portId.trim()) {
            setError("TravelerId, portId and crossing time are required.");
            return;
        }

        try {

            setLoading(true);
            const newCrossing: NewCrossing = {
                travelerId: Number(travelerId.trim()),
                portId: Number(portId.trim()),
                direction: direction,
                mode: mode,
                crossingTime: crossingTime.trim(),
                vehiclePlate: vehiclePlate.trim() || null,
                notes: notes.trim() || null,
            };

            await postCrossing(newCrossing);
            setLoading(false);
            setTravelerId("");
            setCrossingTime("");
            setPortId("");
            setDirection("ENTRY");
            setMode("VEHICLE");
            setNotes("");
            setVehiclePlate("");

            await loadCrossings();
        } catch (err: any) {
            setError("Failed to create crossing.");
        } finally {
            setLoading(false);
        }
    }


    const loadCrossings = async () => {
        try {
            setLoading(true);
            setError(null);
            const crossingPage: CrossingPage = await fetchCrossings(0, 10);
            setCrossings(crossingPage.content);
        } catch (err: any) {
            console.log("Border crossing could not be listed");
            setError("Could not load crossings.");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => { loadCrossings(); }, [])

    return (
        <div style={{ padding: "1.5rem" }}>
            <h2>Crossings</h2>
            <form
                onSubmit={handleCreate}
                style={{
                    display: "grid",
                    gridTemplateColumns: "1fr",
                    rowGap: "0.75rem",
                    maxWidth: "200px",
                }}
            >
                <div>
                    <label>
                        Traveler Id
                        <input
                            type="text"
                            value={travelerId}
                            onChange={(e) => setTravelerId(e.target.value)}
                            style={{ width: "100%", padding: "0.25rem" }}
                            required
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Port Id
                        <input
                            type="text"
                            value={portId}
                            onChange={(e) => setPortId(e.target.value)}
                            style={{ width: "100%", padding: "0.25rem" }}
                            required
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Direction
                        <select
                            value={direction}
                            onChange={(e) => setDirection(e.target.value as Direction)}
                            style={{ width: "100%", padding: "0.25rem" }}>
                            <option value="ENTRY">ENTRY</option>
                            <option value="EXIT">EXIT</option>
                        </select>
                    </label>
                </div>
                <div>
                    <label>
                        Mode
                        <select
                            value={mode}
                            onChange={(e) => setMode(e.target.value as Mode)}
                            style={{ width: "100%", padding: "0.25rem" }}>
                            <option value="VEHICLE">VEHICLE</option>
                            <option value="PEDESTRIAN">PEDESTRIAN</option>
                            <option value="AIR">AIR</option>
                            <option value="SEA">SEA</option>
                        </select>
                    </label>
                </div>
                <div>
                    <label>
                        Crossing Time
                        <input
                            type="datetime-local"
                            value={crossingTime}
                            onChange={(e) => setCrossingTime(e.target.value)}
                            style={{ width: "100%", padding: "0.25rem" }}
                            required
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Vehicle Plate
                        <input
                            type="text"
                            value={vehiclePlate}
                            onChange={(e) => setVehiclePlate(e.target.value)}
                            style={{ width: "100%", padding: "0.25rem" }}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Notes
                        <input
                            type="text"
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            style={{ width: "100%", padding: "0.25rem" }}
                        />
                    </label>
                </div>
                <div style={{ display: "flex", alignItems: "flex-end" }}>
                    <button
                        type="submit"
                        style={{
                            padding: "0.5rem 1rem",
                            cursor: "pointer",
                        }}
                    >
                        Create Crossing
                    </button>
                </div>
            </form>
            {loading && <p>Loading Crossing Events ...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}

            {!loading && !error && crossings.length === 0 && <p>No crossing event found.</p>}

            {crossings.length > 0 &&
                <table style={{ borderCollapse: "collapse", width: "100%" }}>
                    <thead>
                        <tr>
                            <th style={{ borderBottom: "1px solid #ccc", textAlign: "left", padding: "0.5rem" }}>ID</th>
                            <th style={{ borderBottom: "1px solid #ccc", textAlign: "left", padding: "0.5rem" }}>Traveler</th>
                            <th style={{ borderBottom: "1px solid #ccc", textAlign: "left", padding: "0.5rem" }}>Port</th>
                            <th style={{ borderBottom: "1px solid #ccc", textAlign: "left", padding: "0.5rem" }}>Direction</th>
                            <th style={{ borderBottom: "1px solid #ccc", textAlign: "left", padding: "0.5rem" }}>Mode</th>
                            <th style={{ borderBottom: "1px solid #ccc", textAlign: "left", padding: "0.5rem" }}>Crossing Time</th>
                            <th style={{ borderBottom: "1px solid #ccc", textAlign: "left", padding: "0.5rem" }}>Vehicle Plate</th>
                            <th style={{ borderBottom: "1px solid #ccc", textAlign: "left", padding: "0.5rem" }}>Notes</th>
                        </tr>
                    </thead>
                    <tbody>
                        {crossings.map((crossing) => (
                            <tr key={crossing.id}>
                                <td style={{ padding: "0.5rem", textAlign: "left" }}>{crossing.id}</td>
                                <td style={{ padding: "0.5rem", textAlign: "left" }}>
                                    <Link to={`/travelers/${crossing.travelerId}`}>
                                        {crossing.travelerName ?? crossing.travelerId}
                                    </Link>
                                </td>
                                <td style={{ padding: "0.5rem", textAlign: "left" }}>
                                    <Link to={`/ports/${crossing.portId}`}>
                                        {crossing.portName ?? crossing.portId}
                                    </Link>
                                </td>
                                <td style={{ padding: "0.5rem", textAlign: "left" }}>{crossing.direction}</td>
                                <td style={{ padding: "0.5rem", textAlign: "left" }}>{crossing.mode}</td>
                                <td style={{ padding: "0.5rem", textAlign: "left" }}>{crossing.crossingTime}</td>
                                <td style={{ padding: "0.5rem", textAlign: "left" }}>{crossing.vehiclePlate ?? "-"}</td>
                                <td style={{ padding: "0.5rem", textAlign: "left" }}>{crossing.notes ?? "-"}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>}

        </div >
    )

};

export default CrossingsPage;