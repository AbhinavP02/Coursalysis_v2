"use client";
import { Explore, Landing } from "@/components";
import fetcher from "@/utils/fetcher";
import useSwr from "swr";

export interface User {
  _id: string;
  email: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  session: string;
  iat: number;
  exp: number;
}

export default function Home() {
  // use fetcher function and swr to get the user

  const sessionAvail = () => {
    const { data, error } = useSwr<User>(
      `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/me`,
      fetcher
    );
    if (data) {
      return data.name;
    } else {
      return "Username not found";
    }
  };
  return (
    <>
      <Landing />
      <Explore />
    </>
  );
}
