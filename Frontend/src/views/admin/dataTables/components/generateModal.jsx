import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
} from "@chakra-ui/react";
import { generateReport } from "api/reports";
import { useState } from "react";

export default function InitialFocus({ isOpen, onClose }) {
  // const { isOpen, onOpen, onClose } = useDisclosure()
  const [date, setDate] = useState("");
  const handleGenerate = async () => {
    let res;
    try {
      setLoading(true);
      res = await generateReport(date);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const [loading, setLoading] = useState(false);
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create your account</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Text placeContent={"center"}>
              Select the month for report generation.
            </Text>
            <Input
              isRequired={true}
              type="month"
              value={date}
              placeholder="2023-09"
              onChange={(e) => setDate(e.target.value)}
            />
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              isLoading={loading}
              loadingText="Generating"
              onClick={handleGenerate}
            >
              Generate
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
