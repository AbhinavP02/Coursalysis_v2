"use client";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import fetcher from "@/utils/fetcher";
import useSwr from "swr";
import { User } from "@/app/page";
import { useRouter } from "next/navigation";
import useLogout from "@/utils/fetcherDelete";

const Navbar = () => {
  const router = useRouter();
  const { deleteSession } = useLogout();
  const sessionAvail = () => {
    const { data, error } = useSwr<User>(
      `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/me`,
      fetcher
    );
    if (data) {
      return (
        <div className="flex gap-x-8">
          <Link
            href="/"
            className="hover:text-red-600 text-gray-800 font-semibold "
          >
            Hi! {data.name}
          </Link>
          <button
            onClick={deleteSession}
            className="hover:text-red-600 text-gray-800 font-semibold "
          >
            LogOut
          </button>
        </div>
      );
    } else {
      return (
        <Link
          href="https://localhost:3000/auth/register"
          className="hover:text-red-600 text-gray-800 font-semibold "
        >
          Sign in
        </Link>
      );
    }
  };

  return (
    <header className="w-full shrink-0  z-10">
      <nav
        className="max-w-[1440px] mx-auto flex
        justify-between items-centre md:px-16 sm:px-10 px-6 py-6 shrink-0"
      >
        <Link href="/" className="flex justify-center items-center shrink-0">
          <Image
            src="/logo-no-background.svg"
            alt="logo"
            width={200}
            loading="lazy"
            height={50}
            className="object-contain"
          />
        </Link>
        <div className="justify-between w-1/2 lg:w-1/3 flex items-center">
          <Link
            href="/"
            className="hover:text-red-600 text-gray-800 font-semibold "
          >
            Compare
          </Link>

          <Link
            href="/"
            className="hover:text-red-600 text-gray-800 font-semibold "
          >
            Bookmarks
          </Link>

          {sessionAvail()}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
