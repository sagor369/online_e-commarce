import {
  BaggageClaim,
  GalleryThumbnails,
  Layers3,
  LayoutDashboard,
  MessagesSquare,
  PackageOpen,
  ReplaceAll,
  ShieldQuestion,
  Users,
  SlidersHorizontal,
  Sparkles,
  ScrollText,
  PlaneLanding,
} from "lucide-react";
import { IoFootball } from "react-icons/io5";

const routes = [
  {
    name: "Dashboard",
    layout: "/admin",
    path: "dashboard",
    icon: <LayoutDashboard className="h-6 w-6" />,
  },
  {
    name: "Invoice",
    layout: "/admin",
    path: "invoice",
    icon: <ScrollText className="h-6 w-6" />,
  },
  {
    name: "Orders",
    layout: "/admin",
    path: "orders",
    icon: <BaggageClaim className="h-6 w-6" />,
  },
  {
    name: "Categories",
    layout: "/admin",
    path: "categories",
    icon: <Layers3 className="h-6 w-6" />,
  },
  {
    name: "Sub Category",
    layout: "/admin",
    path: "sub-category",
    icon: <ReplaceAll className="h-6 w-6" />,
  },
  {
    name: "Featured Category",
    layout: "/admin",
    path: "featured-category",
    icon: <Sparkles className="h-6 w-6" />,
  },
  {
    name: "Products",
    layout: "/admin",
    path: "products",
    icon: <PackageOpen className="h-6 w-6" />,
  },
  {
    name: "Manage Products",
    layout: "/admin",
    path: "manage-product",
    icon: <SlidersHorizontal className="h-6 w-6" />,
  },
  {
    name: "New Arrivals",
    layout: "/admin",
    path: "new-arrival",
    icon: <PlaneLanding className="h-6 w-6" />,
  },
  {
    name: "Banner",
    layout: "/admin",
    path: "banner",
    icon: <GalleryThumbnails className="h-6 w-6" />,
  },
  {
    name: "Users",
    layout: "/admin",
    path: "users",
    icon: <Users className="h-6 w-6" />,
  },
  {
    name: "FAQ",
    layout: "/admin",
    path: "faq",
    icon: <ShieldQuestion className="h-6 w-6" />,
  },
  {
    name: "Contact Us",
    layout: "/admin",
    path: "contact-us",
    icon: <MessagesSquare className="h-6 w-6" />,
  },
  {
    name: "Footer",
    layout: "/admin",
    path: "footer-management",
    icon: <IoFootball className="h-6 w-6" />,
  },
];

export default routes;
