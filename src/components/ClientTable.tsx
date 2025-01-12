import React from "react";
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
  // Fonction pour trouver le plus ancien client par ville
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

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>City</th>
          <th>Birthday</th>
        </tr>
      </thead>
      <tbody>
        {clients.map((client) => (
          <tr
            key={client.name}
            style={{
              backgroundColor:
                oldestPerCity[client.city]?.name === client.name
                  ? "lightblue"
                  : "transparent",
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
