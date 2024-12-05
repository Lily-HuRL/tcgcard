export default function FilterBar({ query, onFilter, placeholder }) {
    return (
      <div className="mb-4">
        <input
          type="text"
          value={query}
          onChange={onFilter}
          placeholder={placeholder}
          className="p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    );
  }
  