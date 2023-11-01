import {
  Avatar,
  Box,
  Flex,
  FormLabel,
  Icon,
  Select,
  SimpleGrid,
  useColorModeValue,
} from "@chakra-ui/react";
import MiniStatistics from "components/card/MiniStatistics";
import IconBox from "components/icons/IconBox";
import React, { useState } from "react";
import {
  MdAttachMoney,
  MdBarChart,
  MdOutlineCalendarMonth,
} from "react-icons/md";
import { FaRupeeSign, FaMeta } from "react-icons/fa6";
import { ImUsers } from "react-icons/im";
import WeeklyRevenue from "views/admin/default/components/WeeklyRevenue";
import { useEffect } from "react";
import { getDashboard } from "api/dashboard";

export default function UserReports() {
  // Chakra Color Mode
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const brandColor = useColorModeValue("brand.500", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  useEffect(async () => {
    try {
      const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      setLoading(true);
      const month = months[new Date().getMonth() - 1];
      const year = new Date().getFullYear();
      console.log(month, year);
      let res = await getDashboard(month, year);
      setData(res);
      setLoading(false);
    } catch (error) {
      setError(error);
    }
  }, []);
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      {!loading && (
        <>
          <SimpleGrid
            columns={{ base: 1, md: 2, lg: 3, "2xl": 6 }}
            gap="20px"
            mb="20px"
          >
            <MiniStatistics
              startContent={
                <IconBox
                  w="56px"
                  h="56px"
                  bg={boxBg}
                  icon={
                    <Icon
                      w="32px"
                      h="32px"
                      as={MdAttachMoney}
                      color={brandColor}
                    />
                  }
                />
              }
              name="Earnings($)"
              value={`$ ${data[0]}`}
            />
            <MiniStatistics
              startContent={
                <IconBox
                  w="56px"
                  h="56px"
                  bg={boxBg}
                  icon={
                    <Icon
                      w="32px"
                      h="32px"
                      as={FaRupeeSign}
                      color={brandColor}
                    />
                  }
                />
              }
              name="Earnings(PKR)"
              value={`PKR ${data[1]}`}
            />
            <MiniStatistics
              startContent={
                <IconBox
                  w="56px"
                  h="56px"
                  bg={boxBg}
                  icon={
                    <Icon w="32px" h="32px" as={FaMeta} color={brandColor} />
                  }
                />
              }
              name="Amount Billed By Meta"
              value={`$ ${data[2]}`}
            />
            <MiniStatistics
              startContent={
                <IconBox
                  w="56px"
                  h="56px"
                  bg={boxBg}
                  icon={
                    <Icon
                      w="32px"
                      h="32px"
                      as={MdBarChart}
                      color={brandColor}
                    />
                  }
                />
              }
              name="Total Revenue"
              value={`$ ${data[3]}`}
            />
            <MiniStatistics
              startContent={
                <IconBox
                  w="56px"
                  h="56px"
                  bg={boxBg}
                  icon={
                    <Icon w="28px" h="28px" as={ImUsers} color={brandColor} />
                  }
                />
              }
              name="Total Clients"
              value={data[4]}
            />
            <MiniStatistics
              startContent={
                <IconBox
                  w="56px"
                  h="56px"
                  bg={boxBg}
                  icon={
                    <Icon
                      w="32px"
                      h="32px"
                      as={MdOutlineCalendarMonth}
                      color={brandColor}
                    />
                  }
                />
              }
              name="Data Available"
              value={`Last ${data[5]} Months`}
            />
          </SimpleGrid>

          <SimpleGrid>
            <WeeklyRevenue data={data[6]} />
          </SimpleGrid>
        </>
      )}
    </Box>
  );
}
