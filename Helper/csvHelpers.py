from Config.dbConfig import establish_connection, close_connection


def generateCheck(month,year):
    try:
        queryBilling = 'SELECT * FROM billing_logs WHERE INV_MONTH = %s AND INV_YEAR = %s'
        queryMau = 'SELECT * FROM mau_logs WHERE INV_MONTH = %s AND INV_YEAR = %s'
        cursor, connection = establish_connection()
        cursor.execute(queryBilling,(month,year))
        resultBilling = cursor.fetchone() is not None
        cursor.execute(queryMau,(month,year))
        resultMau = cursor.fetchone() is not None
        
        if(resultBilling and resultMau):
            return True
        elif(resultBilling):
            response = {
                "message" : 'Mau doesnt exist'
            }
        elif(resultMau):
            response = {
                "message" : 'Meta Invoice doesnt exist'
            }
        else:
            response = {
                "message" : 'Mau and Meta invoice both doesnt exist'
            }
        return response
    except Exception as ex:
        print(ex) 