import React, { useState, useMemo } from "react";
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
  const [clients] = useState<Client[]>([
    { name: "Alotta Fudge", city: "New York", birthday: "1995-03-01" },
    { name: "Anita Bath", city: "Jacksonville", birthday: "1980-05-07" },
    { name: "Paige Turner", city: "Washington", birthday: "1975-02-13" },
    { name: "Stan Still", city: "Dallas", birthday: "1952-10-31" },
    { name: "Terry Aki", city: "Columbus", birthday: "1960-01-03" },
  ]);

  const [filters, setFilters] = useState({
    searchTerm: "",
    city: null as string | null,
    highlightOldest: false,
  });

  const filteredClients = useMemo(() => {
    return clients.filter((client) => {
      const matchesSearch = client.name
        .toLowerCase()
        .includes(filters.searchTerm.toLowerCase());
      const matchesCity = filters.city ? client.city === filters.city : true;
      return matchesSearch && matchesCity;
    });
  }, [clients, filters]);

  return (
    <div>
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <SearchBar
          onSearch={(searchTerm) =>
            setFilters((prev) => ({ ...prev, searchTerm }))
          }
        />
        <Dropdown
          options={[
            { value: "New York", label: "New York" },
            { value: "Jacksonville", label: "Jacksonville" },
            { value: "Washington", label: "Washington" },
            { value: "Dallas", label: "Dallas" },
            { value: "Columbus", label: "Columbus" },
          ]}
          onChange={(city) => setFilters((prev) => ({ ...prev, city }))}
        />
        <HighlightCheckbox
          onChange={(highlightOldest) =>
            setFilters((prev) => ({ ...prev, highlightOldest }))
          }
        />
      </div>
      {filteredClients.length > 0 ? (
        <ClientTable
          clients={filteredClients}
          highlightOldest={filters.highlightOldest}
        />
      ) : (
        <p style={{ textAlign: "center" }}>No clients match your criteria.</p>
      )}
    </div>
  );
};

export default App;
