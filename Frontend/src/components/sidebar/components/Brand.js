import React from "react";

// Chakra imports
import { Flex, Image, Text, useColorModeValue } from "@chakra-ui/react";

// Custom components
import { HorizonLogo } from "components/icons/Icons";
import eocean from "assets/img/auth/waiz.png";
import { HSeparator } from "components/separator/Separator";

export function SidebarBrand() {
  //   Chakra color mode
  let logoColor = useColorModeValue("navy.700", "white");

  return (
    <Flex align="center" direction="column">
      <Flex align="center" direction="row">
        <Image src={eocean} h="50px" w="50px" my="32px" />
        <Text mx={"8px"} fontWeight={"bold"}>
          Digital Connect Billing
        </Text>
        {/* <HorizonLogo h="26px" w="175px" my="32px" color={logoColor} /> */}
      </Flex>
      <HSeparator mb="20px" />
    </Flex>
  );
}

export default SidebarBrand;
