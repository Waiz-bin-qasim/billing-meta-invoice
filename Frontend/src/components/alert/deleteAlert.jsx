import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    AlertDialogCloseButton,
    Button
  } from '@chakra-ui/react'

export default function DeleteAlert({ isOpen, onClose,data,count}) {
  
    // const { isOpen, onOpen, onClose } = useDisclosure()
    // const cancelRef = React.useRef()
  const handleUserDelete =(e)=>{
    console.log(e.target.value);
    // console.log(count);
  }
    return (
      <>
        {/* <Button onClick={onOpen}>Discard</Button> */}
        <AlertDialog
          motionPreset='slideInBottom'
          onClose={onClose}
          isOpen={isOpen}
          isCentered
        >
          <AlertDialogOverlay />
  
          <AlertDialogContent>
            <AlertDialogHeader>Discard Changes?</AlertDialogHeader>
            <AlertDialogCloseButton />
            <AlertDialogBody>
              Are you sure you want to discard this User ?
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button  onClick={onClose}>
                No
              </Button>
              <Button colorScheme='red' ml={3} onClick={handleUserDelete} value={data}>
                Yes
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </>
    )
  }