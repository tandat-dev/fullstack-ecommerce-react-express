const routes = {
  // USER
  home: "/",
  shop: "/shop",
  checkout: "/checkout",
  detailProduct: "/product/:alias/:id",
  new: "/new",
  about: "/about",
  contact: "/contact",
  profile: "/account/profile/:username/*",
  register: "/account/register",
  login: "/account/login",
  thanks: "/thanks",

  // ADMIN
  dashboard: "/admin/dashboard",
  categories: "/admin/categories",
  products: "/admin/products",
  orders: "/admin/orders",
  news: "/admin/news",
  contacts: "/admin/contacts",
  users: "/admin/users",
  orderDetails: "/admin/orders/details/:orderId",
};

export default routes;
