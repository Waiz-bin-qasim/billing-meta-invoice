""" 
Deleting Billing Mau, Meta Invoices, and Logs from Database

"""

from Config.dbConfig  import establish_connection, close_connection


def DeleteBillingMAU(param1,param2):
    try:
        cursor, connection = establish_connection()
    
        delete_query = "DELETE FROM mau WHERE INV_MONTH = %s AND INV_YEAR = %s"
        cursor.execute(delete_query, (param1, param2))
        print("Delete Query:", delete_query % (param1, param2))
        connection.commit()
        close_connection(cursor,connection)
        
        cur,conn = establish_connection()
        print(param1)
        print(param2)
        delQuery = "DELETE FROM mau_logs WHERE INV_MONTH = %s AND INV_YEAR = %s"
        cur.execute(delQuery, (param1, param2))
        conn.commit()        
        close_connection(cur, conn)
        return 1
    except Exception as ex:
        print(ex)
        return 0

def DeleteInvoices(param1, param2):

    cursor, connection = establish_connection()
   
    delete_query = "DELETE FROM billing_meta_invoice WHERE INV_MONTH = %s AND INV_YEAR = %s"
    cursor.execute(delete_query, (param1, param2))
    connection.commit()

    delete_query = "DELETE FROM billing_logs WHERE INV_MONTH = %s AND INV_YEAR = %s"
    cursor.execute(delete_query, (param1, param2))
    connection.commit()

    close_connection(cursor, connection)

