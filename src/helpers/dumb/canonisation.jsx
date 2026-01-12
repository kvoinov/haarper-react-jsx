export function canon(path) {
  if (path === "/") return "/";
  return path.endsWith("/") ? path : path + "/";
}
