import React, { useState } from "react";
import moment from "moment";

type Client = {
  name: string;
  city: string;
  birthday: string; // Format YYYY-MM-DD
};

type ClientTableProps = {
  clients: Client[];
  highlightOldest: boolean;
};

const ClientTable: React.FC<ClientTableProps> = ({ clients, highlightOldest }) => {
  const [sortConfig, setSortConfig] = useState<{ key: keyof Client; direction: "asc" | "desc" } | null>(null);

  const sortedClients = [...clients].sort((a, b) => {
    if (!sortConfig) return 0;

    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];

    if (sortConfig.key === "birthday") {
      return sortConfig.direction === "asc"
        ? moment(aValue).diff(moment(bValue))
        : moment(bValue).diff(moment(aValue));
    }

    if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
    if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
  });

  const getOldestPerCity = (clients: Client[]) => {
    const oldest: Record<string, Client> = {};
    clients.forEach((client) => {
      if (
        !oldest[client.city] ||
        moment(client.birthday).isBefore(oldest[client.city].birthday)
      ) {
        oldest[client.city] = client;
      }
    });
    return oldest;
  };

  const oldestPerCity = highlightOldest ? getOldestPerCity(clients) : {};

  const handleSort = (key: keyof Client) => {
    setSortConfig((prev) => {
      if (prev?.key === key) {
        return { key, direction: prev.direction === "asc" ? "desc" : "asc" };
      }
      return { key, direction: "asc" };
    });
  };

  return (
    <div
      style={{
        marginLeft :"16px",
        width: "600px",
        margin: "20px auto",
        border: "2px solid #000000", // Bordure autour de tout le tableau
        borderRadius: "8px", // Coins arrondis
        overflow: "hidden", // Pour éviter le dépassement
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Optionnel : ombre pour l'esthétique
      }}
    >
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th
              style={{
                padding: "10px",
                textAlign: "center",
                backgroundColor: "#f4f4f4",
                fontWeight: "600",
              }}
            
            >
              Name
            </th>
            <th
              style={{
                padding: "10px",
                textAlign: "center",
                backgroundColor: "#f4f4f4",
                fontWeight: "600",
              }}
            
            >
              City
            </th>
            <th
              style={{
                padding: "10px",
                textAlign: "center",
                backgroundColor: "#f4f4f4",
                fontWeight: "600",
              }}
              
            >
              Birthday
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedClients.map((client) => (
            <tr
              key={client.name}
              style={{
                backgroundColor:
                  oldestPerCity[client.city]?.name === client.name
                    ? "#A4D8FF" // Couleur bleue pour les clients les plus anciens
                    : "transparent",
                textAlign: "center",
              }}
            >
              <td style={{ padding: "7px" }}>{client.name}</td>
              <td style={{ padding: "5px" }}>{client.city}</td>
              <td style={{ padding: "5px" }}>
                {moment(client.birthday).format("MM.DD.YYYY")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClientTable;
