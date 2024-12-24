import { useQuery, useMutation, QueryClient } from "@tanstack/react-query";
import { User, FetchUser } from "../types";

const getUsers = async () => {
  try {
    const response = await fetch("https://randomuser.me/api/?results=10");
    const data = await response.json();
    return data.results.map((user: FetchUser) => ({
      id: user.login.uuid,
      title: user.name.title,
      firstName: user.name.first,
      lastName: user.name.last,
      email: user.email,
      picture: user.picture.medium,
      country: user.location.country,
      city: user.location.city,
      streetName: user.location.street.name,
      streetNumber: user.location.street.number,
    }));
  } catch (error) {
    console.error("Error fetching users:", error);
  }
};
export function useUsers(queryClient: QueryClient) {
  const { data: users = [], isLoading } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => getUsers(),
  });
  const deleteUserMutation = useMutation({
    mutationFn: async (userId: string) => {
      return userId;
    },
    onSuccess: (userId) => {
      queryClient.setQueryData(["users"], (oldUsers: User[] | undefined) => {
        if (!oldUsers) return [];
        return oldUsers.filter((user) => user.id !== userId);
      });
    },
  });

  const addUserMutation = useMutation({
    mutationFn: async (newUser: Partial<User>) => {
      const user: User = {
        ...newUser,
        id: Math.random().toString(36).substr(2, 9),
      } as User;
      return user;
    },
    onSuccess: (newUser) => {
      queryClient.setQueryData(["users"], (oldUsers: User[] | undefined) => {
        if (!oldUsers) return [newUser];
        return [...oldUsers, newUser];
      });
    },
  });

  const updateUserMutation = useMutation({
    mutationFn: async (updatedUser: User) => {
      console.log(updatedUser);

      return updatedUser;
    },
    onSuccess: (updatedUser) => {
      queryClient.setQueryData(["users"], (oldUsers: User[] | undefined) => {
        if (!oldUsers) return [updatedUser];
        return oldUsers.map((user) =>
          user.id === updatedUser.id ? updatedUser : user
        );
      });
    },
  });

  return {
    users,
    isLoading,
    deleteUserMutation,
    updateUserMutation,
    addUserMutation,
  };
}
