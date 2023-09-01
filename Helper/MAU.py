import pandas as pd
from Config.dbConfig import establish_connection, close_connection
import openpyxl


def parseMAUFile():
    try:
        loc = "MAU.xlsx"
        wb = openpyxl.load_workbook(loc)
        ws = wb.active

        li = []
        for row in ws.iter_rows(min_row=2, max_row=ws.max_row,min_col=1, max_col=11, values_only=True):
            li.append(row)

        sqlQuery = "INSERT INTO mau (ORG_NAME_PRM,WHATSAPP_ACCOUNT_ID, MONTHLY_ACTIVE_USER_LIMIT, BAND_PRICE, AGENT_LICENCES, AGENT_LICENSE_PRICE, ADDITIONAL_AGENT_LICENSE_PRICE, SUPPORT_FEE, MONTH_, MAU_Count,ORG_PLAN) VALUES (%s,%s,%s,%s, %s, %s, %s, %s, %s, %s, %s)"
        cursor, connection = establish_connection()
        if(li):
            cursor.executemany(sqlQuery, li)
            connection.commit()
            close_connection(cursor, connection)
            response = {
                'message': 'success'
            }
        else:
            response = {
                'message' : 'failed'
            }
        return response
    except Exception as ex:
        print(f"error during inserting excel file: {ex}")
        return ex
