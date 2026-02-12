import { BrowserRouter, Route, Routes } from "react-router-dom";
import { routes } from "../utils/routes";
import LayoutMain from "../components/LayoutMain";
import Invoice from "../routes/Confectionery";

const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route path={routes.HOME} element={<LayoutMain />}>
        <Route path={routes.HOME} element={<Invoice />} />
          <Route path={routes.INVOICE} element={<Invoice />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default Router;
