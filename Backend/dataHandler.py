import gc
import oldPdfReader
import oldDataCleaner
import newPdfReader
import newDataCleaner
import pandas as pd
import mysql.connector
import datetime
import os
import getpass
import re
from Config.dbConfig import establish_connection, close_connection
from flask import jsonify
import numpy as np
from Sockets.sockets import updateProgress

sqlQuery = "INSERT INTO billing_logs(INV_MONTH,INV_YEAR, CREATED_BY, CREATED_ON) VALUES(%s,%s,%s,%s)"
def get_sys_details():
    current_datetime = datetime.datetime.now()
    return current_datetime


def insert_database(cursor , connection , sql_values, month , year, current_datetime,user):

  try: 
    print("sql_values") 
    if sql_values:
      for record in sql_values:
        converted_record = []
        for value in record:
            if isinstance(value, (np.float64, np.float32)):
                converted_record.append(float(value))
            elif isinstance(value, (np.int64, np.int32)):
                converted_record.append(int(value))
            else:
                converted_record.append(value)
        cursor.execute(sql_query, converted_record)      
      connection.commit()
      response = {
        'message': 'success'
      }
      cursor.execute(sqlQuery,(month,year,user,current_datetime))
      connection.commit()
    else:
      response = {
        'message' : "failed"
      }
      raise Exception("Failed to insert data in the Database")

    return response
  
  except Exception as ex:
    print(f"Error while inserting data to the database: {ex}")
    raise Exception(ex)


def create_dataframe(parserChoice):
  
  df = pd.read_csv("newFile.csv")
  if (parserChoice == "0"):
    df = df.rename(columns={'WABA Name / ID / PO': 'Name', 'Destination Country/Region & Product': 'Product'})
  else:
    df = df.rename(columns={'WABA Name' : 'Name', 'Conversations' : 'Quantity'})
  print(df)
  return df


def convert_to_numeric(data_table):
    data_table['Quantity'] = pd.to_numeric(data_table['Quantity'])
    data_table['Total'] = pd.to_numeric(data_table['Total'])


def delete_files():
    #if os.path.exists("transaction.pdf"):             
    # os.remove("transaction.pdf")
    if os.path.exists("new_file.csv"):             
      os.remove("newFile.csv")
    if os.path.exists("output.csv"):             
      os.remove("output.csv")
  

def computing_totals(data_table,pdf_file,sql_values,parserChoice,username):
  
  try:
    if(parserChoice == "0"):
      inv_num,month,year = oldPdfReader.getVariables(pdf_file)
    else:
      inv_num,month,year = newPdfReader.getVariables(pdf_file)
    current_datetime = get_sys_details()
    
    convert_to_numeric(data_table)
  
    for i in range(len(data_table)):
        
        if (not pd.isna(data_table['Name'].iloc[i])):
          if(i!=0):
            sql_values.append((org_id, inv_num, org_name, waba_id, int(user_initiated_count),round(user_initiated_total,2),int(business_initiated_count),round(business_initiated_total,2),int(authentication_count),round(authentication_total,2),int(service_count),round(service_total,2),int(marketing_count),round(marketing_total,2),int(utility_count),round(utility_total,2),current_datetime,username,current_datetime,username,"https://abc.com",month,year))
      
          #initialising the variables
          
          name = data_table['Name'].iloc[i]
          parts = name.split("/")
          org_name = parts[0].strip()
          waba_id = parts[1].strip()
          
          org_id = re.sub(r"\s+", "", org_name)
          org_id = org_id + "-" + month + "/" + year
          
          user_initiated_count = 0
          user_initiated_total = 0
          business_initiated_count = 0
          business_initiated_total = 0
          authentication_count = 0
          authentication_total = 0
          service_count = 0 
          service_total = 0
          marketing_count = 0
          marketing_total = 0
          utility_count = 0
          utility_total = 0
          
        product = data_table['Product'].iloc[i].split('-') # separating region from product
        quantity = data_table['Quantity'].iloc[i]
        total = data_table['Total'].iloc[i]
      
        #performing checks
        if product[1] == ' User' or product[1] == 'User':
          user_initiated_count += quantity
          user_initiated_total += total
        elif product[1] == ' Business' or product[1] == 'Business':
          business_initiated_count += quantity
          business_initiated_total += total
        elif product[1] == ' Authentication' or product[1] == 'Authentication':
          authentication_count += quantity
          authentication_total += total
        elif product[1] == ' Service' or product[1] == 'Service':
          service_count += quantity
          service_total += total
        elif product[1] == ' Marketing' or product[1] == 'Marketing':
          marketing_count += quantity
          marketing_total += total 
        else:
          utility_count += quantity
          utility_total += total
        if(i==len(data_table)-1):
          sql_values.append((org_id, inv_num, org_name, waba_id, int(user_initiated_count),round(user_initiated_total,2),int(business_initiated_count),round(business_initiated_total,2),int(authentication_count),round(authentication_total,2),int(service_count),round(service_total,2),int(marketing_count),round(marketing_total,2),int(utility_count),round(utility_total,2),current_datetime,username,current_datetime,username,"https://abc.com",month,year))
    return sql_values,month,year,current_datetime
  except Exception as ex:
    print(f"Error during computing totals: {ex}")
    raise Exception(ex)





sql_query = "INSERT INTO billing_meta_invoice (ORG_ID, INVOICE_NUMBER, ORG_NAME, WABA_ID, USER_INITIATED_COUNT,USER_INITIATED_TOTAL,BUSINESS_INITIATED_COUNT,BUSINESS_INITIATED_TOTAL,AUTHENTICATION_COUNT,AUTHENTICATION_TOTAL,SERVICE_COUNT,SERVICE_TOTAL,MARKETING_COUNT,MARKETING_TOTAL,UTILITY_COUNT,UTILITY_TOTAL,CREATED_ON,CREATED_BY,UPDATED_ON,UPDATED_BY,INV_URL,INV_MONTH,INV_YEAR) VALUES (%s,%s,%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"


def run(sql_values,parserChoice,user):
    
  try:
      
      pdf_file = "transaction.pdf"
      file = "output.csv"
      if (parserChoice == "0"):
        oldPdfReader.readPdf(pdf_file)
        oldDataCleaner.dataCleaning(file)
      elif (parserChoice == "1"):
        newPdfReader.readPdf(pdf_file)
        newDataCleaner.dataCleaning(file)
      else:
        response = {
        'message' : "wrong option"
        }
        raise Exception("Wrong Option Selected")
      
      data_table = create_dataframe(parserChoice) 
      sql_values,month,year,current_datetime = computing_totals(data_table , pdf_file , sql_values , parserChoice,user)
      cursor,connection = establish_connection() 
      response = insert_database(cursor , connection , sql_values,month,year,current_datetime,user)
      close_connection(cursor , connection)
      delete_files()
      return response
  
  except FileNotFoundError as e:
        print(f"Error: File not found: {pdf_file}")
        print(e)
        raise Exception(e)
  except Exception as ex:
        print(f"An unexpected error occurred: {ex}")
        raise Exception(ex)
        

