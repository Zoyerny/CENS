import { LOGOUT_MUTATION } from "@/graphql/logout.mutation";
import { useAuth } from "@/utils/contexts/auth-context";
import { useSocket } from "@/utils/contexts/socket-context";
import { ClientToServerId } from "@/utils/socket/socket.enums";
import { useMutation } from "@apollo/client";
import React from "react";

export default function NavSettings() {
  const { user, setUser } = useAuth();
  const [logoutMutation] = useMutation(LOGOUT_MUTATION);

  const { disconnected } = useSocket();


  const handleLogout = () => {
    if (!user) return;

    logoutMutation({ variables: { id: user.id } })
      .then((result) => {
        if (result.data) {
          console.log("logged out :", result.data.logout.loggedOut);
          setUser(null);
          disconnected();
        }
      })
      .catch((error) => {
        console.error("Error during logout:", error);
      });
  };
  return (
    <>
      <button onClick={handleLogout}>Logout</button>
    </>
  );
}
