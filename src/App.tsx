import React, { useState } from "react";
import SearchBar from "./components/SearchBar";
import Dropdown from "./components/Dropdown";
import HighlightCheckbox from "./components/HighlightCheckbox";
import ClientTable from "./components/ClientTable";

type Client = {
  name: string;
  city: string;
  birthday: string; // Format YYYY-MM-DD
};

const App: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([
    { name: "Alotta Fudge", city: "New York", birthday: "1995-03-01" },
    { name: "Anita Bath", city: "Jacksonville", birthday: "1980-05-07" },
    { name: "Paige Turner", city: "Washington", birthday: "1975-02-13" },
    { name: "Stan Still", city: "Dallas", birthday: "1952-10-31" },
    { name: "Terry Aki", city: "Columbus", birthday: "1960-01-03" },
  ]);
  const [filteredClients, setFilteredClients] = useState<Client[]>(clients);
  const [highlightOldest, setHighlightOldest] = useState<boolean>(false);

  const handleSearch = (searchTerm: string) => {
    setFilteredClients(
      clients.filter((client) =>
        client.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  };

  const handleCityFilter = (city: string | null) => {
    setFilteredClients(
      city ? clients.filter((client) => client.city === city) : clients
    );
  };

  return (
    <div>
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <SearchBar onSearch={handleSearch} />
        <Dropdown
          options={[
            { value: "New York", label: "New York" },
            { value: "Jacksonville", label: "Jacksonville" },
            { value: "Washington", label: "Washington" },
            { value: "Dallas", label: "Dallas" },
            { value: "Columbus", label: "Columbus" },
          ]}
          onChange={handleCityFilter}
        />
        <HighlightCheckbox
          onChange={setHighlightOldest}
        />
      </div>
      <ClientTable
        clients={filteredClients}
        highlightOldest={highlightOldest}
      />
    </div>
  );
};

export default App;
