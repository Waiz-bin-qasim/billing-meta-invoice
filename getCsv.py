from dataHandler import establish_connection, close_connection
import datetime
import excelDataHandler

def createFileName():
	current_time = datetime.datetime.now().strftime('%Y%m%d%H%M%S')
	file_name = f'excel_file_{current_time}.xlsx'
	return file_name
def run(param1 , param2):
	
	cursor, connection = establish_connection()
	file_name = createFileName()
	sql_query = "SELECT t1.ORG_NAME_PRM,COALESCE(t2.USER_INITIATED_COUNT + t2.SERVICE_COUNT, 0) AS SERVICE_COUNT,COALESCE(t2.BUSINESS_INITIATED_COUNT + t2.MARKETING_COUNT, 0) AS MARKETING_COUNT,COALESCE(t2.UTILITY_COUNT, 0) AS UTILITY_COUNT,COALESCE(t2.AUTHENTICATION_COUNT, 0) AS AUTHENTICATION_COUNT,COALESCE(ROUND(t2.USER_INITIATED_TOTAL + t2.SERVICE_TOTAL, 2), 0) AS SERVICE_TOTAL,COALESCE(ROUND(t2.BUSINESS_INITIATED_TOTAL + t2.MARKETING_TOTAL, 2), 0) AS MARKETING_TOTAL,COALESCE(ROUND(t2.UTILITY_TOTAL, 2), 0) AS UTILITY_TOTAL,COALESCE(ROUND(t2.AUTHENTICATION_TOTAL, 2), 0) AS AUTHENTICATION_TOTAL,t1.ORG_PLAN,t1.MONTHLY_ACTIVE_USER_LIMIT,t1.BAND_PRICE,t1.MAU_COUNT,t1.BAND_PRICE,t1.ADDITIONAL_CHARGES,t1.MAU_COUNT - t1.MONTHLY_USER_LIMIT AS POSITIVE_DIFFERENCE,t1.AGENT_LICENSE,t1.AGENT_LICENSE_PRICE/t1.AGENT_LICENSE AS ADDITIONAL_AGENT_PRICE,t1.AGENT_LICENSE_PRICE,t1.SUPPORT_FEE,CONCAT(t1.INV_MONTH, '-', t1.INV_YEAR) AS BILLINGDATE,COALESCE(ROUND(t2.SERVICE_TOTAL + t2.USER_INITIATED_TOTAL + t2.BUSINESS_INITIATED_TOTAL + t2.MARKETING_TOTAL + t2.AUTHENTICATION_TOTAL + t2.UTILITY_TOTAL, 2), 0) AS SUBTOTAL FROM mau t1 LEFT JOIN billing_meta_invoice t2 ON t1.WABA_ID = t2.WABA_ID AND t1.INV_MONTH = %s AND t2.INV_YEAR = %s"	

	cursor.execute(sql_query,(param1,param2))
	result_list = cursor.fetchall()
	close_connection(cursor, connection)
	estimated_total = 0
	for record in result_list:
		estimated_total += record[14]  
		
	estimated_total = round(estimated_total,2)
	print(result_list)
	excelDataHandler.data_handler(file_name,result_list,estimated_total,0)
	return file_name