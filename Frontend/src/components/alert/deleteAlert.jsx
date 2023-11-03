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
import { MAUDelete } from 'api/MAU';
import { financeReportsDelete } from 'api/financeReports';
import { metaINvoiceDelete } from 'api/metaInvoice';
import { reportsDelete } from 'api/reports';
import { deleteUser } from 'api/user';

export default function DeleteAlert({ isOpen, onClose,data,count,tableName}) {
  console.log(tableName);

  const handleUserDelete =async(e)=>{
    let response;
    try {
      if(tableName === 'Meta Invoice'){
        response = await metaINvoiceDelete();
      }else if(tableName === 'Monthly Active Users'){
        response = await MAUDelete();
      }else if(tableName === 'Reports'){
        response = await reportsDelete();
      }else if(tableName === 'Finance Reports'){
        response = await financeReportsDelete()
      }
      else if(tableName === 'Users'){
        response = await deleteUser()
      }
      console.log(e.target.value);
      // console.log(count);
    } catch (error) {
      
    }
  }
    return (
      <>
        {/* <Button onClick={onOpen}>Discard</Button> */}
        <AlertDialog
          onClose={onClose}
          isOpen={isOpen}
        >
          <AlertDialogOverlay />
  
          <AlertDialogContent>
            <AlertDialogHeader>Discard Changes?</AlertDialogHeader>
            <AlertDialogCloseButton />
            <AlertDialogBody>
              Are you sure you want to discard this Record ?
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