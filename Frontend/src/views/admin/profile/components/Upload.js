// Chakra imports
import {
  Box,
  Button,
  Flex,
  Icon,
  Text,
  VStack,
  Input,
  useColorModeValue,
} from "@chakra-ui/react";
import { MAUPOST } from "api/MAU";
import { financeReportsPOST } from "api/financeReports";
import { metaInvoicePOST } from "api/metaInvoice";
// Custom components
import Card from "components/card/Card.js";
import IconBox from "components/icons/IconBox";
import React, { useState } from "react";
// Assets
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import { MdUpload } from "react-icons/md";
import Dropzone from "views/admin/profile/components/Dropzone";

export default function Upload(props) {
  const { used, total, tablename, ...rest } = props;
  const [image, setImage] = useState();
  const [loading, setLoading] = useState(false);
  // Chakra Color Mode
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const brandColor = useColorModeValue("brand.500", "white");
  const textColorSecondary = "gray.400";
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");

  const handleImageUpload = async () => {
    let response;
    try {
      if (image) {
        setLoading(true);
        if (tablename === "Meta Invoice") {
          response = await metaInvoicePOST("1", image.image);
        } else if (tablename === "Monthly Active Users") {
          response = await MAUPOST(image.image);
        } else if (tablename === "Finance Reports") {
          response = financeReportsPOST(image.image);
        }
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <Card {...rest} mb="20px" align="center" p="20px">
      <Flex h="100%" direction={{ base: "column", "2xl": "row" }}>
        <Dropzone
          w={{ base: "100%", "2xl": "268px" }}
          me="36px"
          maxH={{ base: "60%", lg: "50%", "2xl": "100%" }}
          minH={{ base: "60%", lg: "50%", "2xl": "100%" }}
          content={
            <Box>
              <Icon as={MdUpload} w="80px" h="80px" color={brandColor} />
              <Flex justify="center" mx="auto" mb="12px">
                <Text fontSize="xl" fontWeight="700" color={brandColor}>
                  Upload Files
                </Text>
              </Flex>
              <Text
                fontSize="sm"
                fontWeight="500"
                color="secondaryGray.500"
              ></Text>
            </Box>
          }
          image={image}
          setImage={setImage}
        />
        <Flex direction="column" pe="44px">
          <Text
            color={textColorPrimary}
            fontWeight="bold"
            textAlign="start"
            fontSize="2xl"
            mt={{ base: "20px", "2xl": "50px" }}
          >
            Upload {tablename}
          </Text>
          <Text
            color={textColorSecondary}
            fontSize="md"
            my={{ base: "auto", "2xl": "10px" }}
            mx="auto"
            textAlign="start"
          >
            Stay on the pulse of distributed projects with an anline whiteboard
            to plan, coordinate and discuss
          </Text>
          <Flex w="100%">
            <Button
              me="100%"
              mb="50px"
              w="140px"
              minW="140px"
              mt={{ base: "20px", "2xl": "auto" }}
              variant="brand"
              fontWeight="500"
              isLoading={loading}
              onClick={handleImageUpload}
            >
              Upload Now
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Card>
  );
}
