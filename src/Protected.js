import { useAuth } from "./context/AuthContext";

export default function PrivateRoute({ children, allowedRoles = [] }) {
  const { token, userInfo } = useAuth();

  // Not logged in → block
  if (!token) return null;

  // Wrong role → block
  if (allowedRoles.length && !allowedRoles.includes(userInfo?.user_type)) {
    return null;
  }

  return children;
}
