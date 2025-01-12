type SearchBarProps = {
    onSearch: (searchTerm: string) => void;
  };
  
  const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => (
    <input
      type="text"
      placeholder="Search by name"
      onChange={(e) => onSearch(e.target.value)}
    />
  );
  
  export default SearchBar;
  