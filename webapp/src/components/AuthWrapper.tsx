import { useNavigate } from "react-router-dom";

// Aquí debería ir todo el tema de los PODs
// import { onSessionRestore } from "@inrupt/solid-client-authn-browser";

type AuthWrapperProps = {
    children: any;
};

export default function AuthWrapper({ children, ...props }: AuthWrapperProps) {
    return children;
}