import { BrowserRouter, Route, Routes } from "react-router-dom";
import { routes } from "../utils/routes";
import LayoutMain from "../components/LayoutMain";
import Confectionery from "../routes/Confectionery";
import PowerAttorney from "../routes/PowerAttorney";
import Score from "../routes/Score";
import PriceProduct from "../routes/PriceProduct";

const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route path={routes.HOME} element={<LayoutMain />}>
        <Route path={routes.HOME} element={<Confectionery />} />
        <Route path={routes.CONFECTIONERY} element={<Confectionery />} />
        <Route path={routes.POWER_ATTORNEY} element={<PowerAttorney />} />
        <Route path={routes.SCORE} element={<Score />} />
        <Route path={routes.PRICE_PRODUCT} element={<PriceProduct />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default Router;
