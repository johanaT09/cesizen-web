import { Capacitor } from "@capacitor/core";

export default defineNuxtRouteMiddleware((to) => {
  const authToken = useCookie("auth_token");
  const userRole = useCookie("user_role");
  const isNative = process.client && Capacitor.isNativePlatform();

  if (to.path.startsWith("/admin")) {
    if (isNative) {
      return navigateTo("/");
    }

    if (!authToken.value || String(userRole.value) !== "2") {
      return navigateTo("/");
    }
  }
});
