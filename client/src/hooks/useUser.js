import { useState } from "react";

//state variable to store the current user in the front end
export const useUser = () => {
  const [user, setUser] = useState(null);

  return { user, setUser };
};
