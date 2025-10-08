import routesConfig from "../config";
// Pages USER
import Home from "../components/pages/USER/Home";
import Shop from "../components/pages/USER/Shop";
import CheckOut from "../components/pages/USER/CheckOut";
import DetailProduct from "../components/pages/USER/DetailProduct";
import New from "../components/pages/USER/New";
import About from "../components/pages/USER/About";
import Contact from "../components/pages/USER/Contact";
import Profile from "../components/pages/USER/Profile";
import Register from "../components/auth/Register";
import Login from "../components/auth/Login";
import Thanks from "../components/pages/USER/Thanks";

// Pages ADMIN
import Dashboard from "../components/pages/ADMIN/Dashboard";
import Categories from "../components/pages/ADMIN/Categories";
import Products from "../components/pages/ADMIN/Products";
import Orders from "../components/pages/ADMIN/Orders";
import OrderDetails from "../components/pages/ADMIN/OrderDetails";
import News from "../components/pages/ADMIN/News";
import Contacts from "../components/pages/ADMIN/Contacts";
import Users from "../components/pages/ADMIN/Users";

const publicRoutes = [
  { path: routesConfig.routes.home, component: Home },
  { path: routesConfig.routes.shop, component: Shop },
  { path: routesConfig.routes.checkout, component: CheckOut },
  { path: routesConfig.routes.detailProduct, component: DetailProduct },
  { path: routesConfig.routes.new, component: New },
  { path: routesConfig.routes.about, component: About },
  { path: routesConfig.routes.contact, component: Contact },
  { path: routesConfig.routes.profile, component: Profile },
  { path: routesConfig.routes.register, component: Register },
  { path: routesConfig.routes.login, component: Login },
  { path: routesConfig.routes.thanks, component: Thanks },
];

const privateRoutes = [
  { path: routesConfig.routes.dashboard, component: Dashboard },
  { path: routesConfig.routes.categories, component: Categories },
  { path: routesConfig.routes.products, component: Products },
  { path: routesConfig.routes.orders, component: Orders },
  { path: routesConfig.routes.orderDetails, component: OrderDetails },
  { path: routesConfig.routes.news, component: News },
  { path: routesConfig.routes.contacts, component: Contacts },
  { path: routesConfig.routes.users, component: Users },
];

export { publicRoutes, privateRoutes };
