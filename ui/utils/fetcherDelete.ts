import useSWR from "swr";
import { useRouter } from "next/navigation";
import axios from "axios";

const fetcherDelete = (url: string) =>
  axios.delete(url, { withCredentials: true }).then((res) => res.data);

const useLogout = () => {
  const router = useRouter();

  const deleteSession = async () => {
    try {
      const response = await fetcherDelete(
        `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/sessions`
      );
      if (response) {
        router.push("/auth/login"); // Redirect to login page after successful logout
      }
    } catch (error) {
      console.error("Failed to logout", error);
    }
  };

  return { deleteSession };
};

export default useLogout;
