import React from "react";
import Image from "next/image";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

const Header = () => {
  return (
    <div className="flex justify-between items-center shadow-sm px-4 py-2 md:px-6">
      <Link href={"/dashboard"}>
      <Image className="py-2" src="/logo.svg" alt="logo" width={29} height={29} />
      </Link>
      
      <UserButton />
    </div>
  );
};

export default Header;