export const getRequest = (route: string) =>
  fetch(`${route}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  }).then((res) => res.json());
