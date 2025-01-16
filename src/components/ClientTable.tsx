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
    <table style={{ width: "100%", borderCollapse: "collapse" }}>
      <thead>
        <tr>
          <th onClick={() => handleSort("name")} style={{ cursor: "pointer" }}>Name</th>
          <th onClick={() => handleSort("city")} style={{ cursor: "pointer" }}>City</th>
          <th onClick={() => handleSort("birthday")} style={{ cursor: "pointer" }}>Birthday</th>
        </tr>
      </thead>
      <tbody>
        {sortedClients.map((client) => (
          <tr
            key={client.name}
            style={{
              backgroundColor:
                oldestPerCity[client.city]?.name === client.name
                  ? "lightblue"
                  : "transparent",
              textAlign: "center",
            }}
          >
            <td>{client.name}</td>
            <td>{client.city}</td>
            <td>{moment(client.birthday).format("DD.MM.YYYY")}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ClientTable;
