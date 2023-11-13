import { Box, Button, SimpleGrid } from "@chakra-ui/react";
import DevelopmentTable from "views/admin/dataTables/components/DevelopmentTable";
import { columnsDataDevelopment } from "views/admin/dataTables/variables/columnsData";
import tableDataDevelopment from "views/admin/dataTables/variables/tableDataDevelopment.json";
import React, { useEffect, useState } from "react";
import { LoadingSpinner } from "components/loading/loadingSpinner";
import { metaInvoiceGet } from "api/metaInvoice";
import { useToast } from "@chakra-ui/toast";
import { MAUGet } from "api/MAU";
import { reportsGet } from "api/reports";
import { financeReportsGet } from "api/financeReports";

export default function Settings({ metaData }) {
  // Chakra Color Mode
  const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState([]);
  const toast = useToast();
  useEffect(async () => {
    let response;
    try {
      setLoading(true);
      if (metaData === "Meta Invoice") {
        response = await metaInvoiceGet();
      } else if (metaData === "Monthly Active Users") {
        response = await MAUGet();
      } else if (metaData === "Reports") {
        response = await reportsGet();
      } else if (metaData === "Finance Reports") {
        response = await financeReportsGet();
      }

      let data = [];
      for (let each of response) {
        let obj = {};
        if (metaData == "Meta Invoice" || metaData == "Monthly Active Users") {
          obj.name = each[0] + each[1];
        } else {
          obj.name = each[1];
        }
        obj["created by"] = each[1];
        obj["created on"] = each[2];
        obj.actions = each[1];
        data.push(obj);
      }
      setTableData(data);
      setLoading(false);
    } catch (error) {
      console.log("error");
      console.log(error);
    }
  }, []);

  return (
    <>
      <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
        <SimpleGrid
          mb="20px"
          columns={{ sm: 1 }}
          spacing={{ base: "20px", xl: "20px" }}
        >
          {loading ? (
            <LoadingSpinner />
          ) : (
            <DevelopmentTable
              columnsData={columnsDataDevelopment}
              tableData={tableData}
              tableName={metaData}
            />
          )}
        </SimpleGrid>
        {/* <Button
            onClick={() => {
              console.log("waiz");
              toast({
                title: "Account created.",
                description: "We've created your account for you.",
                status: "success",
                duration: 9000,
                isClosable: true,
              });
            }}
          >
            waiz
          </Button> */}
      </Box>
    </>
  );
}
