import getCookie from "@/utils/getCookie";

export default async () => {
  let csrfTokenCookie = getCookie("XSRF-TOKEN")
  // TODO localstorage
  if (!csrfTokenCookie) {
    await fetch(`${import.meta.env.VITE_API_DOMAIN}${import.meta.env.VITE_TOKEN_PATH}`, {
        credentials: "include",
    })
      .then(() => {
        csrfTokenCookie = getCookie("XSRF-TOKEN");
      })
      .catch(() => {});
  }
  return decodeURIComponent(csrfTokenCookie)
}
