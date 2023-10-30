from Config.dbConfig import establish_connection, close_connection
import newPdfReader 
import oldPdfReader

def checkBillingLogs(parserChoice):
    try:
        pdf_file = "transaction.pdf"
        print(type(parserChoice))
        if(parserChoice == '1'):
            print(parserChoice)
            invNum,invMonth,invYear = newPdfReader.getVariables(pdf_file)
            
        else:
            invNum,invMonth,invYear = oldPdfReader.getVariables(pdf_file)
           
        query = 'SELECT * FROM billing_logs WHERE INV_MONTH = %s AND INV_YEAR = %s'
        cursor, connection = establish_connection()
        cursor.execute(query, (invMonth,invYear))
        if(cursor.fetchone()):
            return False
        
        return True
    except Exception as ex:
        print(ex)

def getAllBilling():
    try:
        cursor, connection = establish_connection()
        query = 'SELECT * FROM billing_logs'  
        cursor.execute(query)
        result = cursor.fetchall()
        return result
    except Exception as ex:
        print(ex)  
        
