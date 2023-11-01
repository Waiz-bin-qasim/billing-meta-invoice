import { Box, Button, SimpleGrid } from "@chakra-ui/react";
import DevelopmentTable from "views/admin/dataTables/components/DevelopmentTable";
import { columnsDataDevelopment } from "views/admin/dataTables/variables/columnsData";
import tableDataDevelopment from "views/admin/dataTables/variables/tableDataDevelopment.json";
import React, { useEffect, useState } from "react";
import { LoadingSpinner } from "components/loading/loadingSpinner";
import { metaInvoiceGet } from "api/metaInvoice";
import { useToast } from "@chakra-ui/toast";

export default function Settings(metaData) {
  // Chakra Color Mode
  const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState([]);
  const toast = useToast();
  useEffect(async () => {
    let response;
    try {
      setLoading(true);
      response = await metaInvoiceGet();
      let data = [];
      for (let each of response) {
        let obj = {};
        obj.name = each[0] + each[1];
        obj["created by"] = each[1];
        obj["created on"] = each[2];
        obj.actions = "";
        data.push(obj);
      }
      setTableData(data);
      setLoading(false);
      console.log(tableData);
    } catch (error) {
      console.log("error");
      console.log(error);
    }
  }, []);

  return (
    <>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
          <SimpleGrid
            mb="20px"
            columns={{ sm: 1 }}
            spacing={{ base: "20px", xl: "20px" }}
          >
            <DevelopmentTable
              columnsData={columnsDataDevelopment}
              tableData={tableData}
              tableName={"Meta Invoices"}
            />
          </SimpleGrid>
          <Button
            onClick={() =>
              toast({
                title: "Account created.",
                description: "We've created your account for you.",
                status: "success",
                duration: 9000,
                isClosable: true,
              })
            }
          >
            waiz
          </Button>
        </Box>
      )}
    </>
  );
}
