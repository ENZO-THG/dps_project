import React, { useState, useMemo } from "react";
import Select, { StylesConfig, SingleValue } from "react-select";
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
  { name: "James Maddison", city: "Columbus", birthday: "1990-05-08" },
  { name: "Enzo Kroos", city: "New York", birthday: "1977-10-09" },
  { name: "Lamine Morales", city: "Dallas", birthday: "1990-05-11" },
  { name: "Grace James", city: "Washington", birthday: "2004-04-01" },
  { name: "Karim Lacroix", city: "Jacksonville", birthday: "1999-08-12" },
  { name: "Sophia Laurent", city: "Los Angeles", birthday: "2005-09-15" },
  { name: "Mason Carter", city: "Chicago", birthday: "2006-11-21" },
  { name: "Isabella Diaz", city: "San Francisco", birthday: "2002-04-10" },
  { name: "Liam Brown", city: "Los Angeles", birthday: "2003-06-18" },
  { name: "Emma Wilson", city: "New York", birthday: "2004-08-23" },
  { name: "Ethan Davis", city: "Seattle", birthday: "2007-01-12" },
  { name: "Olivia Martinez", city: "Jacksonville", birthday: "2005-12-05" },
  { name: "Noah Johnson", city: "Denver", birthday: "2001-03-14" },
  { name: "Ava Robinson", city: "Chicago", birthday: "2006-07-09" },
  { name: "Lucas Wright", city: "Seattle", birthday: "2002-02-28" },
  { name: "Emily Stone", city: "Boston", birthday: "2004-09-10" },
  { name: "Jack Harper", city: "New York", birthday: "2003-04-17" },
  { name: "Harper Lee", city: "Boston", birthday: "2002-11-25" },
  { name: "Alexander King", city: "Miami", birthday: "1998-08-30" },
  { name: "Charlotte Reed", city: "Chicago", birthday: "2007-05-02" },
  ]);

  const [filters, setFilters] = useState({
    searchName: "",
    city: "",
    highlightOldest: false,
  });

  const filteredClients = useMemo(() => {
    return clients.filter((client) => {
      const matchesSearch = client.name
        .toLowerCase()
        .includes(filters.searchName.toLowerCase());
      const matchesCity = filters.city ? client.city === filters.city : true;
      return matchesSearch && matchesCity;
    });
  }, [clients, filters]);

  const cities = Array.from(new Set(clients.map((client) => client.city)));
  const cityOptions = cities.map((city) => ({ value: city, label: city }));

  const customSelectStyles: StylesConfig<{ value: string; label: string }, false> = {
    container: (provided) => ({
      ...provided,
      minWidth: "150px",
      maxWidth: "200px",
    }),
    control: (provided) => ({
      ...provided,
      backgroundColor: "rgba(255, 255, 255, 0.6)",
      border: "1px solid #ccc",
      borderRadius: "6px",
      boxShadow: "none",
      cursor: "pointer",
      ":hover": {
        borderColor: "#888",
      },
    }),
    menu: (provided) => ({
      ...provided,
      backdropFilter: "blur(8px)",
      WebkitBackdropFilter: "blur(8px)",
      background: "rgba(255, 255, 255, 0.85)",
      border: "1px solid rgba(0, 0, 0, 0.1)",
      boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? "rgba(0, 150, 255, 0.2)" : "transparent",
      color: "#000",
      cursor: "pointer",
    }),
  };

  return (
    <div
      style={{
        width: "600px", 
        margin: "20px auto", 
        padding: "20px",
        border: "2px solid black", 
        borderRadius: "15px", 
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", 
        backgroundColor: "#fff", 
      }}
    >
      {/* control bar */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: "12px",
          padding: "16px",
          borderRadius: "12px",
          background: "rgba(255, 255, 255, 0.15)",
          boxShadow: "0 5px 10px 0 rgba(31, 38, 135, 0.37)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          border: "1px solid rgb(0, 0, 0)",
          marginBottom: "16px",
          justifyContent: "space-around",
          width: "95%", 
        }}
      >
        {/* search bar */}
        <label
          style={{
            fontWeight: 600,
            display: "flex",
            gap: "4px",
            alignItems: "center",
          }}
        >
          <input
            type="text"
            value={filters.searchName}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, searchName: e.target.value }))
            }
            style={{
              padding: "8px",
              borderRadius: "6px",
              border: "1px solid #ccc",
              outline: "none",
              minWidth: "150px",
              backgroundColor: "rgba(255, 255, 255, 0.6)",
            }}
            placeholder="Search by name..."
          />
        </label>

        {/* city selector */}
        <label
          style={{
            fontWeight: 600,
            display: "flex",
            gap: "4px",
            alignItems: "center",
          }}
        >
          <Select
            options={cityOptions}
            value={cityOptions.find((opt) => opt.value === filters.city) || null}
            onChange={(option: SingleValue<{ value: string; label: string }>) =>
              setFilters((prev) => ({ ...prev, city: option ? option.value : "" }))
            }
            placeholder="Select city..."
            styles={customSelectStyles}
            isClearable
          />
        </label>

        {/* checkbox for Highlight Oldest */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <label
            style={{
              fontWeight: 200,
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            Highlight oldest per city:
            <div
              style={{
                display: "inline-block",
                position: "relative",
                
              }}
            >
              <input
                type="checkbox"
                checked={filters.highlightOldest}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    highlightOldest: e.target.checked,
                  }))
                }
                style={{
                  width: "20px",
                  height: "20px",
                  backgroundColor: filters.highlightOldest ? "#A4D8FF" : "#ccc",
                  border: "1px solid #aaa",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              />
            </div>
          </label>
        </div>
      </div>

      {/* Tableau des clients */}
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
