import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const usePremiumUser = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: premium, isLoading } = useQuery({
    queryKey: ["premium"],
    enabled: !loading && !!user?.email,
    // !!user?.email return true if email exist
    queryFn: async () => {
      const { data } = await axiosSecure(`/user/${user?.email}`);
      return data.isPremium;
    },
  });
  return [premium, isLoading];
};

export default usePremiumUser;
