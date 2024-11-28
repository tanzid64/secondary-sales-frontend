import { FC } from "react";
import { Route, Routes } from "react-router";
import HomePage from "./pages/home-page";
import InvoiceDetails from "./pages/invoice-details";
import RetailInvoicesPage from "./pages/retail-invoices";
import { RetailOrderPage } from "./pages/retail-order";
import SignIn from "./pages/sign-in";
import ProtectedRouteProvider from "./providers/protected-routes";

const App: FC = () => {
  return (
    <Routes>
      {/* Public Route */}
      <Route path="/sign-in" element={<SignIn />} />

      {/* Protected Routes */}
      <Route element={<ProtectedRouteProvider />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/retail-orders" element={<RetailOrderPage />} />
        <Route path="/retail-invoices" element={<RetailInvoicesPage />} />
        <Route path="/retail-invoices/:id" element={<InvoiceDetails />} />
      </Route>
    </Routes>
  );
};

export default App;
