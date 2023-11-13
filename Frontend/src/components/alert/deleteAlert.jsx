import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  Button,
} from "@chakra-ui/react";
import { MAUDelete } from "api/MAU";
import { financeReportsDelete } from "api/financeReports";
import { metaINvoiceDelete } from "api/metaInvoice";
import { reportsDelete } from "api/reports";
import { deleteUser } from "api/user";
import { useState } from "react";

export default function DeleteAlert({ isOpen, onClose, tableName, value }) {
  const [loading, setLoading] = useState(false);
  const handleUserDelete = async () => {
    let response;
    try {
      setLoading(true);
      console.log(value);
      if (tableName === "Meta Invoice") {
        response = await metaINvoiceDelete(value);
      } else if (tableName === "Monthly Active Users") {
        response = await MAUDelete(value);
      } else if (tableName === "Reports") {
        response = await reportsDelete(value);
      } else if (tableName === "Finance Reports") {
        response = await financeReportsDelete(value);
      } else if (tableName === "Users") {
        response = await deleteUser(value);
      }
      setLoading(false);
      onClose(true);
    } catch (error) {}
  };
  return (
    <>
      {/* <Button onClick={onOpen}>Discard</Button> */}
      <AlertDialog onClose={onClose} isOpen={isOpen}>
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>Discard Changes?</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            Are you sure you want to discard this record {value} ?
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button onClick={onClose}>No</Button>
            <Button
              colorScheme="red"
              ml={3}
              onClick={handleUserDelete}
              isLoading={loading}
              loadingText="Deleting"
            >
              Yes
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
