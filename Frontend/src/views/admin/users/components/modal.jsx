import { useToast } from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormLabel,
  Input,
  FormControl,
  InputRightElement,
  InputGroup,
  Select,
} from "@chakra-ui/react";
import { updateUser } from "api/user";
import { userPOST } from "api/user";
import { getRole } from "api/user";
import react, { useEffect, useState } from "react";

export default function InitialFocus({ isOpen, onClose, modalTitle, value }) {
  // const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState([]);
  const [roleLoading, setRoleLoading] = useState(false);
  const [formData, setFormData] = useState(() => {
    console.log(value);
    if (value) {
      return {
        firstName: value.name.split(" ")[0],
        lastName: value.name.split(" ")[1],
        email: value.email,
        password: value,
        roleId: value,
      };
    }
    return {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      roleId: "",
    };
  });
  const [options, setOptions] = useState([]);
  useEffect(async () => {
    try {
      setRoleLoading(true);
      let res = await getRole();
      setOptions(res);
      setRoleLoading(false);
    } catch (error) {
      setError(error);
    }
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    // if (modalTitle == 'Update User'){
    //   const [columns,setColumns] = (['email']);
    //   const [values,setValues] = ([value]);
    //   setColumns(name);
    //   setValues(value);
    // }
  };
  const [show, setShow] = useState(false);
  const handleClick = () => {
    (async () => {
      try {
        if (modalTitle == "Add User") {
          setLoading(true);
          const res = await userPOST(
            formData.firstName,
            formData.lastName,
            formData.email,
            formData.password,
            formData.roleId
          );
          setLoading(false);
          onClose(true);
        } else {
          setLoading(true);
          const res = await updateUser(
            formData.email,
            ["first_name", "last_name", "uesrname", "role_id"],
            [formData.firstName, formData.lastName, formData.email, "ADM0"]
          );
          setLoading(false);
          onClose(true);
        }
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
      onClose(true);
    })();
  };
  const handleUserEdit = () => {
    setLoading(true);
  };
  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={(val) => {
          onClose(val);
          setFormData({});
        }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{modalTitle}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>First name</FormLabel>
              <Input
                onChange={handleChange}
                placeholder="First name"
                value={formData.firstName}
                name="firstName"
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Last name</FormLabel>
              <Input
                onChange={handleChange}
                placeholder="Last name"
                value={formData.lastName}
                name="lastName"
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Email</FormLabel>
              <Input
                onChange={handleChange}
                placeholder="jhonDeo@example.com"
                value={formData.email}
                name="email"
              />
            </FormControl>
            {modalTitle === "Add User" ? (
              <FormControl mt={4}>
                <FormLabel>Password</FormLabel>
                <InputGroup size="md">
                  <Input
                    onChange={handleChange}
                    pr="4.5rem"
                    value={formData.password}
                    type={show ? "text" : "password"}
                    placeholder="Enter password"
                    name="password"
                  />
                  <InputRightElement width="4.5rem">
                    <Button
                      h="1.75rem"
                      size="sm"
                      onClick={() => setShow(!show)}
                    >
                      {show ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
            ) : (
              <></>
            )}
            <FormControl mt={4}>
              <FormLabel>Role </FormLabel>
              <Select
                placeholder="Select Role"
                value={formData.roleId}
                onChange={handleChange}
                name="roleId"
              >
                {options.map((option) => (
                  <option key={option[0]} value={option[0]}>
                    {option[1]}
                  </option>
                ))}
              </Select>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button
              onClick={handleClick}
              isLoading={loading}
              colorScheme="brand"
              mr={3}
              loadingText="Updating"
            >
              Save
            </Button>
            <Button colorScheme="gray" mr={-3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost"></Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
