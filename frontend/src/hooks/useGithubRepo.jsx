import { useQuery } from "@tanstack/react-query";
import { getGithubProfile } from "../api/github.api.js";

export const useGithubProfile = () => {
    return useQuery({
        queryKey: ["github-repo"],
        queryFn: () => getGithubProfile(localStorage.getItem('userId')),
        staleTime: 1000 * 60 * 5,
        retry: 1,
        refetchOnWindowFocus: false
    });
};