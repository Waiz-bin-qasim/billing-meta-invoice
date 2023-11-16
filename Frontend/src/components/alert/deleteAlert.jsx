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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function DeleteAlert({
  isOpen,
  onClose,
  tableName,
  value,
  getTableData,
}) {
  const [loading, setLoading] = useState(false);
  const showToastError = (msg) => {
    toast.error(`${msg}`, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: 0,
      theme: "light",
    });
  };
  const showToastSuccess = (msg) => {
    toast.success(`${msg}`, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: 0,
      theme: "light",
    });
  };
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
      console.log(response);
      if (response.status != 200) {
        throw { message: response.message };
      }
      showToastSuccess(response.message);
      await getTableData();
    } catch (error) {
      showToastError(error.message);
    }
    onClose(true);
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
            <ToastContainer
              position="top-center"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
