interface User {
  id: number;
  name: string;
  role: "admin" | "user";
}

export const useAuth = () => {
  const user = useState<User | null>("user", () => null);
  const token = useCookie("auth_token");

  const isAdmin = computed(() => user.value?.role === "admin");

  const logout = async () => {
    user.value = null;
    token.value = null;
    await navigateTo("/login");
  };

  return { user, isAdmin, logout };
};
