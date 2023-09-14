from dataHandler import establish_connection, close_connection
import datetime
import excelDataHandler

def createFileName(param1 , param2):
	current_time = datetime.datetime.now().strftime('%Y%m%d%H%M%S')
	file_name = f'excel_file_{current_time}.xlsx'
	return "./excel/"+param1+param2+".xlsx"
def run(param1 , param2):
	
	cursor, connection = establish_connection()
	file_name = createFileName(param1,param2)
	sql_query = "SELECT t1.ORG_NAME_PRM,COALESCE(t2.USER_INITIATED_COUNT + t2.SERVICE_COUNT, 0) AS SERVICE_COUNT,COALESCE(t2.BUSINESS_INITIATED_COUNT + t2.MARKETING_COUNT, 0) AS MARKETING_COUNT,COALESCE(t2.UTILITY_COUNT, 0) AS UTILITY_COUNT,COALESCE(t2.AUTHENTICATION_COUNT, 0) AS AUTHENTICATION_COUNT,COALESCE(ROUND(t2.USER_INITIATED_TOTAL + t2.SERVICE_TOTAL, 2), 0) AS SERVICE_TOTAL,COALESCE(ROUND(t2.BUSINESS_INITIATED_TOTAL + t2.MARKETING_TOTAL, 2), 0) AS MARKETING_TOTAL,COALESCE(ROUND(t2.UTILITY_TOTAL, 2), 0) AS UTILITY_TOTAL,COALESCE(ROUND(t2.AUTHENTICATION_TOTAL, 2), 0) AS AUTHENTICATION_TOTAL,t1.ORG_PLAN,t1.MONTHLY_ACTIVE_USER_LIMIT,SUBSTRING(BAND_PRICE, 1, 3) AS BAND_PRICE_CURR,CAST(SUBSTRING(BAND_PRICE, 5) AS FLOAT) AS BAND_PRICE,t1.MAU_COUNT,CAST(SUBSTRING(BAND_PRICE, 5) AS FLOAT) AS BAND_PRICE,t1.ADDITIONAL_CHARGES,t1.MAU_COUNT - CAST(t1.MONTHLY_ACTIVE_USER_LIMIT AS FLOAT) AS POSITIVE_DIFFERENCE,CAST(t1.AGENT_LICENCES AS FLOAT) - CAST(t1.ADD_ONS AS FLOAT) AS AGENT_LICENSES,CAST(SUBSTRING(t1.AGENT_LICENSE_PRICE, 5) AS FLOAT) - t1.ADD_ONS_AGENT_PRICE AS AGENT_LICENSE_PRICE,SUBSTRING(SUPPORT_FEE, 1, 3) AS SUPPORT_FEE_CURR,CAST(SUBSTRING(SUPPORT_FEE, 5) AS FLOAT) AS SUPPORT_FEE,CONCAT(t1.INV_MONTH, '-', t1.INV_YEAR) AS BILLINGDATE,COALESCE(ROUND(t2.SERVICE_TOTAL + t2.USER_INITIATED_TOTAL + t2.BUSINESS_INITIATED_TOTAL + t2.MARKETING_TOTAL + t2.AUTHENTICATION_TOTAL + t2.UTILITY_TOTAL, 2), 0) AS SUBTOTAL, t1.ADD_ONS, t1.ADD_ONS_AGENT_PRICE FROM mau t1 LEFT JOIN billing_meta_invoice t2 ON t1.WABA_ID = t2.WABA_ID AND t1.INV_MONTH = t2.INV_MONTH AND t1.INV_YEAR = t2.INV_YEAR WHERE t1.INV_MONTH = %s AND t1.INV_YEAR = %s"	

	cursor.execute(sql_query,(param1,param2))
	result_list = cursor.fetchall()
	close_connection(cursor, connection)
	estimatedUSD = 0
	estimatedPKR = 0
	for record in result_list:
		estimatedUSD += record[18]
		if(record[11]=='USD'):
			estimatedUSD += record[12]
		else:
			estimatedPKR += record[12]
		if(record[19] == 'USD'):
			estimatedUSD += record[20]
		else:
			estimatedPKR += record[20]
		if(record[16]>0):
			estimatedUSD += (record[15]*record[16])
	estimatedUSD = round(estimatedUSD,2)
	estimatedPKR = round(estimatedPKR,2)
	print(result_list)
	excelDataHandler.data_handler(file_name,result_list,estimatedUSD,estimatedPKR)
	return file_name