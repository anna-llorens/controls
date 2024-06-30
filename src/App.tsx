import { useState } from "react";

import { useFetch } from "./use-fetch";

function App() {
  const [url] = useState("http://localhost:3000/members");
  const { data, isPending, error } = useFetch(url);
  return (
    <div className="App">
      <h1>Names of Students</h1>
      {isPending && <div>Loading....</div>}
      {error && <div>{error}</div>}
      {data && data.map((name: any) => <p key={name.id}>{name.name}</p>)}
    </div>
  );
}
export default App;
