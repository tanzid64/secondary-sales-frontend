import { FC } from "react";
import { Navigate, Route, Routes } from "react-router";
import InvoiceDetails from "./pages/invoice-details";
import PrintInvoicePDF from "./pages/print-invoice-pdf";
import PrintOrderPDF from "./pages/print-order-pdf";
import PrintSalesReturnPDF from "./pages/print-sales-return-pdf";
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
        <Route path="/retail-order-print/:id" element={<PrintOrderPDF />} />
        <Route path="/retail-invoices" element={<RetailInvoicesPage />} />
        <Route path="/retail-invoices/:id" element={<InvoiceDetails />} />
        <Route
          path="/retail-invoices-print/:id"
          element={<PrintInvoicePDF />}
        />
        <Route path="/sales-return" element={<SalesReturn />} />
        <Route
          path="/sales-return-details/:id"
          element={<SalesReturnDetails />}
        />
        <Route
          path="/sales-return-print/:id"
          element={<PrintSalesReturnPDF />}
        />
      </Route>
    </Routes>
  );
};

export default App;
