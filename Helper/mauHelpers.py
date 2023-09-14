from Config.dbConfig import establish_connection, close_connection
from Helper.MAU import getCredentials


def getAllMau():
    try:
        cursor, connection = establish_connection()
        query = 'SELECT * FROM mau_logs'  
        cursor.execute(query)
        result = cursor.fetchall()
        return result
    except Exception as ex:
        print(ex)
        
def checkMauLogs():
    try:
        month,year = getCredentials()
        query = 'SELECT * FROM mau_logs WHERE INV_MONTH = %s AND INV_YEAR = %s'
        cursor, connection = establish_connection()
        cursor.execute(query, (month,year))
        if(cursor.fetchone()):
            return False
        return True
    except Exception as ex:
        print(ex)