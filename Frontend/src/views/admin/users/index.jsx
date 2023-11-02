import React, { useEffect, useState } from "react";
import ComplexTable from "views/admin/dataTables/components/ComplexTable";
import { columnsDataComplex } from "views/admin/dataTables/variables/columnsData";
import tableDataComplex from "views/admin/dataTables/variables/tableDataComplex.json";
import { Box, SimpleGrid } from "@chakra-ui/react";
import { getUser } from "api/user";

export default function Users() {
  const [data,setData] = useState([])
  const [loading,setLoading] = useState(false)
  const [error,setError] = useState(false)
  useEffect(async()=>{
    try {
      setLoading(true)
      let res = await getUser()
      setData(res)
      setLoading(false)
    } catch (error) {
      setError(error)
    }
  },[])
  const tableDataComplex = data.map(entry => {
    const email = entry[0];
    const name = entry[1];
    const role = entry[2];
    const status = entry[3] === 0 ? "Inactive" : "Active";
    
    return {
        name: name,
        status: status,
        email: email,
        role: role
    };
  });
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <SimpleGrid
        mb="20px"
        columns={{ sm: 1 }}
        spacing={{ base: "20px", xl: "20px" }}
      >
        <ComplexTable
          columnsData={columnsDataComplex}
          tableData={tableDataComplex}
        />
      </SimpleGrid>
    </Box>
  );
}


