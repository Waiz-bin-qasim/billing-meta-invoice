// Chakra imports
import {
  Button,
  Flex,
  Input,
  useColorModeValue,
  Box,
  Icon,
  Text,
  Image,
} from "@chakra-ui/react";
// Assets
import React, { useCallback, useState } from "react";
import img from "../../../../assets/img/download.png";
import { useDropzone } from "react-dropzone";
import { MdUpload } from "react-icons/md";

function Dropzone(props) {
  const onDrop = useCallback((acceptedFiles) => {
    console.log(acceptedFiles[0]);
    setImage({
      image: acceptedFiles[0],
      preview: URL.createObjectURL(acceptedFiles[0]),
    });
    console.log(acceptedFiles[0]);
    setContent(
      <Box>
        <Image src={img} w="80px" h="80px" />
        <Flex justify="center" mx="auto" mb="12px">
          <Text fontSize="m" fontWeight="700" color={textColorSecondary}>
            {acceptedFiles[0].name}
          </Text>
        </Flex>
      </Box>
    );
  }, []);

  const brandColor = useColorModeValue("brand.500", "white");
  const [content, setContent] = useState(
    <Box>
      <Icon as={MdUpload} w="80px" h="80px" color={brandColor} />
      <Flex justify="center" mx="auto" mb="12px">
        <Text fontSize="xl" fontWeight="700" color={brandColor}>
          Upload Files
        </Text>
      </Flex>
      <Text fontSize="sm" fontWeight="500" color="secondaryGray.500">
        PNG, JPG and GIF files are allowed
      </Text>
    </Box>
  );
  const { image, setImage, ...rest } = props;
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  const bg = useColorModeValue("gray.100", "navy.700");
  const borderColor = useColorModeValue("secondaryGray.100", "whiteAlpha.100");
  const textColorSecondary = "gray.400";

  return (
    <Flex
      align="center"
      justify="center"
      bg={bg}
      border="1px dashed"
      borderColor={borderColor}
      borderRadius="16px"
      w="100%"
      h="max-content"
      minH="100%"
      cursor="pointer"
      {...getRootProps({ className: "dropzone" })}
      {...rest}
    >
      <Input
        variant="main"
        type="file"
        accept="file"
        display="none"
        {...getInputProps({
          variant: "main",
          type: "file",
          accept: "file",
          display: "none",
        })}
      />
      <Button variant="no-effects">{content}</Button>
    </Flex>
  );
}

export default Dropzone;
