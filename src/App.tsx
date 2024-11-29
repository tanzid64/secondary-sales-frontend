import { FC } from "react";
import { Navigate, Route, Routes } from "react-router";
import InvoiceDetails from "./pages/invoice-details";
import PrintPdf from "./pages/print-pdf";
import RetailInvoicesPage from "./pages/retail-invoices";
import { RetailOrderPage } from "./pages/retail-order";
import RetailOrderDetailsPage from "./pages/retail-order-details";
import SalesReturnDetails from "./pages/sales-return-details";
import SalesReturn from "./pages/sales-return-page";
import SignIn from "./pages/sign-in";
import ProtectedRouteProvider from "./providers/protected-routes";

const App: FC = () => {
  return (
    <Routes>
      {/* Public Route */}
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/" element={<Navigate to="/retail-orders" />} />

      {/* Protected Routes */}
      <Route element={<ProtectedRouteProvider />}>
        <Route path="/retail-orders" element={<RetailOrderPage />} />
        <Route
          path="/retail-order-details/:id"
          element={<RetailOrderDetailsPage />}
        />
        <Route path="/retail-invoices" element={<RetailInvoicesPage />} />
        <Route path="/retail-invoices/:id" element={<InvoiceDetails />} />
        <Route path="/retail-invoices-print/:id" element={<PrintPdf />} />
        <Route path="/sales-return" element={<SalesReturn />} />
        <Route
          path="/sales-return-details/:id"
          element={<SalesReturnDetails />}
        />
      </Route>
    </Routes>
  );
};

export default App;
