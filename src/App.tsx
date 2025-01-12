import React, { useState } from "react";
import SearchBar from "./components/SearchBar";
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
  

  
  
  return (
    <div>
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        
        
        
      </div>
      
    </div>
  );
};

export default App;
