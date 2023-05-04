import { useEffect, useState } from "react";
import { useHandler } from "@/utils/contexts/handler-context";
import Link from "next/link";
import Image from "next/image";
import NavSettings from "./NavSettings";
import { useAuth } from "@/utils/contexts/auth-context";

export interface User {
  id: string;
  username: string;
}

export default function NavDesktop({
  children,
}: {
  children: React.ReactNode;
}) {
  const { onlineUsers, offlineUsers } = useHandler();
  const { user } = useAuth();

  if (!user) {
    return <div>Aucun Utilisateur connecté...</div>;
  }

  return (
    <div id="NavDesktop">
      
    </div>
  );
}
