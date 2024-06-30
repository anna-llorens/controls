import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import axios from "axios";
import { useState } from "react";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Example />
    </QueryClientProvider>
  );
}

function Example() {
  const [newName, setNewName] = useState("");
  const { isPending, error, data } = useQuery({
    queryKey: ["repoData"],
    queryFn: () =>
      axios.get("http://localhost:3000/members").then((res) => res.data),
  });

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  const handleAddMember = async (event: React.FormEvent) => {
    event.preventDefault();

    const newMember = { name: newName, id: Math.random() };

    try {
      const response = await fetch("http://localhost:3000/members", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newMember),
      });

      if (!response.ok) {
        throw new Error("Failed to add new member");
      }

      // Reset the input field
      setNewName("");
      // // Refresh the data
      // window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="App">
      <h1>Names of Students</h1>
      {isPending && <div>Loading....</div>}
      {error && <div>{error.message}</div>}
      {data && data.map((name: any) => <p key={name.id}>{name.name}</p>)}
      <form onSubmit={handleAddMember}>
        <input
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="Enter new name"
          required
        />
        <button type="submit">Add Member</button>
      </form>
      <ReactQueryDevtools initialIsOpen />
    </div>
  );
}
