import { useEffect, useState, type FormEvent } from "react";
import type { Port } from "../types/port";
import { createPort, fetchPorts, type NewPort } from "../api/ports";

function PortPage() {
    const [ports, setPorts] = useState<Port[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [name, setName] = useState("");
    const [country, setCountry] = useState("");
    const [state, setState] = useState("");
    const [code, setCode] = useState("");


    const loadPorts = async () => {
        try {
            setLoading(true);
            setError(null);
            const allPorts = await fetchPorts();
            setPorts(allPorts);

        } catch (err: any) {
            console.error(err);
            setError("Failed to load the ports");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadPorts();
    }, []);

    const handleCreate = async (e: FormEvent) => {
        try {

            setError(null);

            const port: NewPort = {
                name: name.trim(),
                country: country.trim(),
                state: state.trim(),
                code: code.trim()
            };

            await createPort(port);

        } catch (err: any) {
            console.log(err);
            setError("Could not add New Port entry");
        } finally {
            setName("");
            setCountry("");
            setCode("");
            setState("");
            await loadPorts();
        }
    }

    return (
        <div style={{ padding: "1.5rem" }}>
            <h2>Ports of Entry</h2>
            <form
                onSubmit={handleCreate}
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                    gap: "0.75rem",
                    marginBottom: "1.5rem",
                    maxWidth: "900px",
                }}
            >
                <div>
                    <label>
                        Port Name
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            style={{ width: "100%", padding: "0.25rem" }}
                            required
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Country
                        <input
                            type="text"
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                            style={{ width: "100%", padding: "0.25rem" }}
                            required
                        />
                    </label>
                </div>
                <div>
                    <label>
                        State
                        <input
                            type="text"
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                            style={{ width: "100%", padding: "0.25rem" }}
                            required
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Code
                        <input
                            type="text"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            style={{ width: "100%", padding: "0.25rem" }}
                            required
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
                        Create Port
                    </button>
                </div>
            </form>

            {loading && <p>Loading Ports...</p>}
            {error && <p style={{ color: "red", }}>{error}</p>}

            {!loading && !error && ports.length === 0 && <p>No Port of Entry Found</p>}

            {
                ports.length > 0 && (
                    <table style={{ borderCollapse: "collapse", width: "100%" }}>
                        <thead>
                            <tr>
                                <th style={{ borderBottom: "1px solid #ccc", textAlign: "left", padding: "0.5rem" }}>ID</th>
                                <th style={{ borderBottom: "1px solid #ccc", textAlign: "left", padding: "0.5rem" }}>Name</th>
                                <th style={{ borderBottom: "1px solid #ccc", textAlign: "left", padding: "0.5rem" }}>Country</th>
                                <th style={{ borderBottom: "1px solid #ccc", textAlign: "left", padding: "0.5rem" }}>State</th>
                                <th style={{ borderBottom: "1px solid #ccc", textAlign: "left", padding: "0.5rem" }}>Code</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ports.map((port) => (
                                <tr key={port.id}>
                                    <td style={{ padding: "0.5rem" }}>{port.id}</td>
                                    <td style={{ padding: "0.5rem" }}>
                                        {port.name}
                                    </td>
                                    <td style={{ padding: "0.5rem" }}>{port.country}</td>
                                    <td style={{ padding: "0.5rem" }}>{port.state}</td>
                                    <td style={{ padding: "0.5rem" }}>{port.code}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )
            }
        </div >
    );
};

export default PortPage;