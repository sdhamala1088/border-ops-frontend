import { useEffect, useState, type FormEvent } from "react";
import type { Traveler } from "../types/traveler";
import { createTraveler, fetchTravelers } from "../api/travelers";
import type { NewTraveler } from "../api/travelers";

function TravelersPage() {
    const [travelers, setTravelers] = useState<Traveler[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [nationality, setNationality] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [passportNumber, setPassportNumber] = useState("");

    const loadTravelers = async () => {
        try {
            setLoading(true);
            setError(null);
            const page = await fetchTravelers(0, 20);
            setTravelers(page.content);
        } catch (err: any) {
            console.error(err);
            setError("Failed to load travelers");
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = async (e: FormEvent) => {
        e.preventDefault();

        if (!firstName.trim() || !lastName.trim() || !passportNumber.trim()) {
            setError("First name, last name, and passport number are required");
            return;
        }

        const traveler: NewTraveler = {
            firstName: firstName.trim(),
            lastName: lastName.trim(),
            nationality: nationality.trim(),
            dateOfBirth: dateOfBirth || "",
            passportNumber: passportNumber.trim()
        };

        try {
            setError(null);
            await createTraveler(traveler);

            setFirstName("");
            setLastName("");
            setNationality("");
            setDateOfBirth("");
            setPassportNumber("");
            await loadTravelers();
        } catch (err: any) {
            console.error(err);
            setError("Failed to create traveler (maybe passport is duplicate?)");
        }
    };

    useEffect(() => {
        loadTravelers();
    }, []);


    return (
        <div style={{ padding: "1.5rem" }}>
            <h2>Travelers</h2>
            {/* Create Traveler Form */}
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
                        First Name
                        <input
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            style={{ width: "100%", padding: "0.25rem" }}
                            required
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Last Name
                        <input
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            style={{ width: "100%", padding: "0.25rem" }}
                            required
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Nationality
                        <input
                            type="text"
                            value={nationality}
                            onChange={(e) => setNationality(e.target.value)}
                            style={{ width: "100%", padding: "0.25rem" }}
                            placeholder="US, CAD, UK, ..."
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Date Of Birth
                        <input
                            type="date"
                            value={dateOfBirth}
                            onChange={(e) => setDateOfBirth(e.target.value)}
                            style={{ width: "100%", padding: "0.25rem" }}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Passport #
                        <input
                            type="text"
                            value={passportNumber}
                            onChange={(e) => setPassportNumber(e.target.value)}
                            style={{ width: "100%", padding: "0.37rem 0.25rem" }}
                            required
                        />
                    </label>
                </div>

                <div style={{ display: "flex", alignItems: "flex-end" }}>
                    <button
                        type="submit"
                        style={{
                            padding: "0.4rem 1rem",
                            cursor: "pointer",
                        }}
                    >
                        Create Traveller

                    </button>
                </div>
            </form>


            {loading && <p>Loading...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}


            {
                !loading && !error && travelers.length === 0 && (
                    <p>No travelers found.</p>
                )
            }

            {
                travelers.length > 0 && (
                    <table style={{ borderCollapse: "collapse", width: "100%" }}>
                        <thead>
                            <tr>
                                <th style={{ borderBottom: "1px solid #ccc", textAlign: "left", padding: "0.5rem" }}>ID</th>
                                <th style={{ borderBottom: "1px solid #ccc", textAlign: "left", padding: "0.5rem" }}>Name</th>
                                <th style={{ borderBottom: "1px solid #ccc", textAlign: "left", padding: "0.5rem" }}>Nationality</th>
                                <th style={{ borderBottom: "1px solid #ccc", textAlign: "left", padding: "0.5rem" }}>DOB</th>
                                <th style={{ borderBottom: "1px solid #ccc", textAlign: "left", padding: "0.5rem" }}>Passport</th>
                            </tr>
                        </thead>
                        <tbody>
                            {travelers.map((t) => (
                                <tr key={t.id}>
                                    <td style={{ padding: "0.5rem", textAlign: "left" }}>{t.id}</td>
                                    <td style={{ padding: "0.5rem", textAlign: "left" }}>
                                        {t.firstName} {t.lastName}
                                    </td>
                                    <td style={{ padding: "0.5rem", textAlign: "left" }}>{t.nationality}</td>
                                    <td style={{ padding: "0.5rem", textAlign: "left" }}>{t.dateOfBirth}</td>
                                    <td style={{ padding: "0.5rem", textAlign: "left" }}>{t.passportNumber}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )
            }
        </div >
    );
}

export default TravelersPage;