from Config.dbConfig import establish_connection, close_connection


def displayTotalClients(month,year):
    try:
        cursor,connection = establish_connection()
        queryClients = "SELECT count(*) FROM MAU WHERE INV_MONTH = %s  AND INV_YEAR = %s"
        cursor.execute(queryClients,(month,year))
        result = cursor.fetchone()
        return result
    except Exception as ex:
        
        return {
            'message' : 'error displaying clients'
        }
        
def displayTotalInvoices():
    try:
        cursor,connection = establish_connection()
        queryInvoice = "SELECT count(*) FROM billing.billing_logs"
        cursor.execute(queryInvoice)
        result = cursor.fetchone()
        return result
    except Exception as ex:
        return {
            'message' : 'error displaying invoices'
        }      
        
    
def displayTotalUSD(month,year):
    #estimated USD to be read from finance report of particular month and year
    
def displayTotalPKR(month,year):
    #estimated PKR to be read from finance report of particular month and year
    
def displayWhatsappAmount(month,year):
    #to be read from meta invoice of particular month and year