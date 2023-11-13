import { Box, Button, SimpleGrid } from "@chakra-ui/react";
import DevelopmentTable from "views/finance/components/FinanceTable";
import { columnsDataDevelopment } from "views/admin/dataTables/variables/columnsData";
import React, { useEffect, useState } from "react";
import { LoadingSpinner } from "components/loading/loadingSpinner";
import { useToast } from "@chakra-ui/toast";
import { financeReportsGet } from "api/financeReports";

export default function Settings() {
  // Chakra Color Mode
  const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState([]);
  const toast = useToast();
  useEffect(async () => {
    let response;
    try {
      setLoading(true);
      response = await financeReportsGet();
      console.log(response);
      let data = [];
      for (let each of response) {
        let obj = {};
        obj.name = each[1];
        obj["created by"] = each[2];
        obj["created on"] = each[3];
        obj.actions = "";
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
              tableName={"Finance Reports"}
            />
          )}
        </SimpleGrid>
      </Box>
    </>
  );
}
