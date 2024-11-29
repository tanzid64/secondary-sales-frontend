import { axiosInstance } from "@/lib/axios";
import { removeTokenCookie } from "@/lib/handle-cookie";
import { UserType } from "@/lib/types";
import { User2Icon } from "lucide-react";
import { FC } from "react";
import { NavLink, useLocation, useNavigate } from "react-router";
import { Button, buttonVariants } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

interface NavbarProps {
  user: UserType;
}

export const Navbar: FC<NavbarProps> = ({ user }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Fetch user information

  const handleLogout = async () => {
    try {
      const res = await axiosInstance.post("/api/logout");
      console.log(res);
      if (res.status === 200) {
        removeTokenCookie();
        navigate("/sign-in");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const orderMatch =
    location.pathname.startsWith("/retail-order-details") ||
    location.pathname.startsWith("/retail-order-print") ||
    location.pathname === "/retail-orders";

  const invoiceMatch =
    location.pathname.startsWith("/retail-invoices-print") ||
    location.pathname.startsWith("/retail-invoices") ||
    location.pathname === "/retail-invoices";

  const salesReturnMatch =
    location.pathname.startsWith("/sales-return-print") ||
    location.pathname.startsWith("/sales-return-details") ||
    location.pathname === "/sales-return";

  return (
    <nav
      className="border-b h-16   sticky top-0 w-full shadow-sm bg-background
    "
    >
      <div className="pt-3">
        <div className="flex items-center justify-between ">
          <ul className="flex items-center justify-center gap-4 mx-auto">
            <li>
              <NavLink
                to="/retail-orders"
                className={buttonVariants({
                  size: "lg",
                  variant: orderMatch ? "outline" : "link",
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
                  variant: invoiceMatch ? "outline" : "link",
                })}
              >
                Invoices
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/sales-return"
                className={buttonVariants({
                  size: "lg",
                  variant: salesReturnMatch ? "outline" : "link",
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
                <DropdownMenuItem onClick={handleLogout}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
};
