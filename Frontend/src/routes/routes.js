import React from "react";

import { Icon } from "@chakra-ui/react";
import {
  MdBarChart,
  MdPerson,
  MdHome,
  MdLock,
  MdOutlineShoppingCart,
} from "react-icons/md";
import { FaMeta } from "react-icons/fa6";
import { ImUsers } from "react-icons/im";
import { HiDocumentChartBar } from "react-icons/hi2";

// Admin Imports
import MainDashboard from "views/admin/default";
import users from "views/admin/users";
import DataTables from "views/admin/dataTables";

const routes = [
  {
    name: "Dashboard",
    layout: "/admin",
    path: "/default",
    icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
    component: MainDashboard,
  },
  {
    name: "Finance Reports",
    layout: "/admin",
    icon: (
      <Icon
        as={HiDocumentChartBar}
        width="20px"
        height="20px"
        color="inherit"
      />
    ),
    path: "/finance-reports",
    component: DataTables,
  },
  {
    name: "Reports",
    layout: "/admin",
    icon: <Icon as={MdBarChart} width="20px" height="20px" color="inherit" />,
    path: "/reports",
    component: DataTables,
  },
  {
    name: "Monthly Active Users",
    layout: "/admin",
    icon: <Icon as={ImUsers} width="20px" height="20px" color="inherit" />,
    path: "/mau",
    component: DataTables,
  },
  {
    name: "Meta Invoice",
    layout: "/admin",
    icon: <Icon as={FaMeta} width="20px" height="20px" color="inherit" />,
    path: "/metainvoice",
    component: DataTables,
  },
  {
    name: "Users",
    layout: "/admin",
    path: "/users",
    icon: <Icon as={MdPerson} width="20px" height="20px" color="inherit" />,
    component: users,
  },
];

export default routes;
