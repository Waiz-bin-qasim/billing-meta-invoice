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
import react,{ useState } from "react";

export default function InitialFocus({ isOpen, onClose,modalTitle,initialValues, }) {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: '', 
    ...initialValues,
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const [show, setShow] = useState(false)
  const handleClick = () => setShow(!show)
  const handleUserEdit =()=>{
    setLoading(true)
  }
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{modalTitle}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>First name</FormLabel>
              <Input onChange={handleChange} placeholder="First name" value={formData.firstName} name="firstName"/>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Last name</FormLabel>
              <Input onChange={handleChange} placeholder="Last name" value={formData.lastName} name="lastName"/>
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Email</FormLabel>
              <Input onChange={handleChange} placeholder="jhonDeo@example.com" value={formData.email} name="email"/>
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Password</FormLabel>
              <InputGroup size='md'>
                <Input 
                  onChange={handleChange}
                  pr='4.5rem'
                  value={formData.password}
                  type={show ? 'text' : 'password'}
                  placeholder='Enter password'
                  name="password"
                />
                <InputRightElement width='4.5rem'>
                  <Button h='1.75rem' size='sm' onClick={handleClick}>
                    {show ? 'Hide' : 'Show'}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Role </FormLabel>
                <Select placeholder='Select Role' value={formData.role} onChange={handleChange} name="role">
                  <option value='option1' >Option 1</option>
                  <option value='option2'>Option 2</option>
                  <option value='option3'>Option 3</option>
                </Select>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button isLoading={loading} colorScheme="brand" mr={3} onClick={handleUserEdit} loadingText="Updating" >
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
