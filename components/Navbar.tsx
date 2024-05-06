import Link from "next/link";
import { Button, buttonVariants } from "./ui/button";
import { MenuIcon } from "lucide-react";
import { SignInButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { UserButton } from "@clerk/nextjs";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const { userId } = auth();

  return (
    <div className="w-full h-[55px] sm:h-[70px] flex items-center justify-between">
      <Link
        href="/"
        className="p-4 font-extrabold text-2xl sm:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-red-500"
      >
        Blogger
      </Link>
      <div className="hidden sm:flex gap-2 mr-8">
        {!userId && (
          <Link
            href="/sign-in"
            className={cn(
              buttonVariants({
                variant: "premium2",
              })
            )}
          >
            <SignInButton>Login</SignInButton>
          </Link>
        )}
        {userId && (
          <>
            <Link
              href="/create"
              className={cn(
                buttonVariants({
                  variant: "premium2",
                  className: "mr-2",
                })
              )}
            >
              Create
            </Link>
            <UserButton afterSignOutUrl="/sign-in" />
          </>
        )}
      </div>
      <div className="sm:hidden mr-2 p-2">
        <MenuIcon className="h-6 w-6 cursor-pointer" />
      </div>
    </div>
  );
};

export default Navbar;
