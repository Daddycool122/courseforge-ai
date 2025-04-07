import React from "react";
import Image from "next/image";
import { UserButton } from "@clerk/nextjs";

const Header = () => {
  return (
    <div className="flex justify-between items-center shadow-sm px-4 py-2 md:px-6">
      <Image className="py-2" src="/logo.svg" alt="logo" width={29} height={29} />
      <UserButton />
    </div>
  );
};

export default Header;