// Chakra imports
import {
  Box,
  Button,
  Flex,
  Icon,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import Card from "components/card/Card.js";
// Custom components
import BarChart from "components/charts/BarChart";
import React from "react";
import {
  barChartDataConsumption,
  barChartOptionsConsumption,
} from "variables/charts";
import { MdBarChart } from "react-icons/md";

export default function WeeklyRevenue(props) {
  const { data,...rest } = props;

  // Chakra Color Mode
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const iconColor = useColorModeValue("brand.500", "white");
  const bgButton = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  const bgHover = useColorModeValue(
    { bg: "secondaryGray.400" },
    { bg: "whiteAlpha.50" }
  );
  const bgFocus = useColorModeValue(
    { bg: "secondaryGray.300" },
    { bg: "whiteAlpha.100" }
  );
  const dataOptions = () =>{
    let array= []
    if(data)
    {
      for (let i of data){
      console.log(barChartOptionsConsumption.xaxis.categories)
      barChartOptionsConsumption.xaxis.categories.push(i[0])
      console.log(i[0])
    }}
    return barChartOptionsConsumption;
  }
  const fineTuneData = () =>{
    const tempdata  = [{name:"Meta Bill",data:[]},{name:"Our Bill",data:[]}]
    console.log(data)
    if(data){
      for (let i in data){
        console.log(i)
        tempdata[0].data.push(data[i][2])
        console.log(data[i][2])
        tempdata[1].data.push(data[i][3])
        console.log(tempdata)
      }
    }
    return tempdata
  }
  return (
    <Card align='center' direction='column' w='100%' {...rest}>
      <Flex align='center' w='100%' px='15px' py='10px'>
        <Text
          me='auto'
          color={textColor}
          fontSize='xl'
          fontWeight='700'
          lineHeight='100%'>
          Month VS Revenue
        </Text>
        {/* <Button
          align='center'
          justifyContent='center'
          bg={bgButton}
          _hover={bgHover}
          _focus={bgFocus}
          _active={bgFocus}
          w='37px'
          h='37px'
          lineHeight='100%'
          borderRadius='10px'
          {...rest}>
          <Icon as={MdBarChart} color={iconColor} w='24px' h='24px' />
        </Button> */}
      </Flex>

      <Box h='240px' mt='auto'>
        <BarChart
          chartData={fineTuneData()}
          chartOptions={dataOptions()}
        />
      </Box>
    </Card>
  );
}
