import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useFetch } from "./use-fetch";

function App() {
  const { data, isPending, error } = useFetch("http://localhost:3000/members");
  return (
    <div className="App">
      <h1>Names of Students</h1>
      {isPending && <div>Loading....</div>}
      {error && <div>{error.message}</div>}
      {data && data.map((name: any) => <p key={name.id}>{name.name}</p>)}
      <ReactQueryDevtools initialIsOpen />
    </div>
  );
}
export default App;
