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
// import MainDashboard from "views/finance/default";
import financeTable from "views/finance";

const routes = [
  {
    name: "Dashboard",
    layout: "/finance",
    icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
  },
  {
    name: "Finance Reports",
    layout: "/finance",
    icon: (
      <Icon
        as={HiDocumentChartBar}
        width="20px"
        height="20px"
        color="inherit"
      />
    ),
    path: "/finance-reports",
    component: financeTable,
  },
  {
    name: "Reports",
    layout: "/finance",
    icon: <Icon as={MdBarChart} width="20px" height="20px" color="inherit" />,
  },
  {
    name: `Monthly Active Users`,
    layout: "/finance",
    icon: <Icon as={ImUsers} width="18px" height="20px" color="inherit" />,
  },
  {
    name: "Meta Invoice",
    layout: "/finance",
    icon: <Icon as={FaMeta} width="20px" height="20px" color="inherit" />,
  },
  {
    name: "Users",
    layout: "/finance",
    icon: <Icon as={MdPerson} width="20px" height="20px" color="inherit" />,
  },
];

export default routes;
