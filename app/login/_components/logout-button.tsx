"use client";
import { Button } from "@/app/_components/ui/button";
import { signOut } from "next-auth/react";

const LogoutButton = () => {
  return (
    <Button
      size={"sm"}
      variant={"destructive"}
      onClick={() => {
        signOut({
          callbackUrl: "/login",
        });
      }}
    >
      Sair
    </Button>
  );
};

export default LogoutButton;
