import { axiosInstance } from "@/lib/axios";
import { UserType } from "@/lib/types";
import { User2Icon } from "lucide-react";
import { FC } from "react";
import { Button, buttonVariants } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { NavLink, useLocation, useNavigate } from "react-router";

interface NavbarProps {
  user: UserType;
}

export const Navbar: FC<NavbarProps> = ({ user }) => {
  const navigate = useNavigate();

  // Fetch user information

  const handleLogout = async () => {
    try {
      const res = await axiosInstance.post("/api/logout");
      console.log(res);
      if (res.status === 200) {
        localStorage.removeItem("token");
        navigate("/sign-in");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const location = useLocation();
  return (
    <nav className="border-b h-12 my-2 sticky top-0 w-full shadow-sm ">
      <div className="flex items-center justify-between ">
        <ul className="flex items-center justify-center gap-4 mx-auto">
          <li>
            <NavLink
              to="/retail-orders"
              className={buttonVariants({
                size: "lg",
                variant:
                  location.pathname === "/retail-orders" ? "outline" : "link",
                className:
                  location.pathname === "/retail-orders"
                    ? "font-bold border-accent-foreground"
                    : "",
              })}
            >
              Orders
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/retail-invoices"
              className={buttonVariants({
                size: "lg",
                variant:
                  location.pathname === "/retail-invoices" ? "outline" : "link",
                className:
                  location.pathname === "/retail-invoices"
                    ? "font-bold border-accent-foreground"
                    : "",
              })}
            >
              Invoices
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/"
              className={buttonVariants({
                size: "lg",
                variant: location.pathname === "/" ? "outline" : "link",
                className:
                  location.pathname === "/"
                    ? "font-bold border-accent-foreground"
                    : "",
              })}
            >
              Sales Return
            </NavLink>
          </li>
        </ul>
        <div className="pr-5">
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="">
              <Button variant="outline" size="icon" className="rounded-full">
                <User2Icon />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-76">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuLabel>
                User Type: {user?.user_type}
              </DropdownMenuLabel>
              <DropdownMenuLabel>Name: {user?.name}</DropdownMenuLabel>
              <DropdownMenuLabel>Email: {user.email}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
};
