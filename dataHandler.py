
import oldPdfReader
import pandas as pd
import mysql.connector
import datetime
import os
import getpass
import re
from Config.dbConfig import establish_connection, close_connection
from oldDataCleaner import data_cleaning


def get_sys_details():
    current_datetime = datetime.datetime.now()
    username = getpass.getuser()
    return current_datetime,username


def insert_database(cursor , connection):

  try: 
     
    if sql_values:
      cursor.executemany(sql_query, sql_values)      
      connection.commit()
      response = {
        'message': 'success'
      } 
    else:
      response = {
        'message' : "failed"
      }
    return response
  
  except Exception as ex:
    print(f"Error while inserting data to the database: {ex}")


def create_dataframe():
  
  df = pd.read_csv("new_file.csv")
  df = df.rename(columns={'WABA Name / ID / PO': 'Name', 'Destination Country/Region & Product': 'Product'})
  return df

def convert_to_numeric(data_table):
    data_table['Quantity'] = pd.to_numeric(data_table['Quantity'])
    data_table['Total'] = pd.to_numeric(data_table['Total'])


def delete_files():
    if os.path.exists("transaction.pdf"):             
      os.remove("transaction.pdf")
    if os.path.exists("new_file.csv"):             
      os.remove("new_file.csv")
    if os.path.exists("output.csv"):             
      os.remove("output.csv")
  

def computing_totals(data_table,pdf_file):
  
  try:

    inv_num,month,year = oldPdfReader.get_variables(pdf_file)
    current_datetime,username = get_sys_details()
    convert_to_numeric(data_table)
  
    for i in range(len(data_table)):
        
        if (not pd.isna(data_table['Name'].iloc[i])):
          if(i!=0):
            sql_values.append((org_id, inv_num, org_name, waba_id, user_initiated_count,user_initiated_total,business_initiated_count,business_initiated_total,authentication_count,authentication_total,service_count,service_total,marketing_count,marketing_total,utility_count,utility_total,current_datetime,username,current_datetime,username,"https://abc.com",month,year))
      
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
          sql_values.append((org_id, inv_num, org_name, waba_id, user_initiated_count,user_initiated_total,business_initiated_count,business_initiated_total,authentication_count,authentication_total,service_count,service_total,marketing_count,marketing_total,utility_count,utility_total,current_datetime,username,current_datetime,username,"https://abc.com",month,year))
       
  except Exception as ex:
    print(f"Error during computing totals: {ex}")



sql_values = []
sql_query = "INSERT INTO billing_meta_invoice (ORG_ID, INVOICE_NUMBER, ORG_NAME, WABA_ID, USER_INITIATED_COUNT,USER_INITIATED_TOTAL,BUSINESS_INITIATED_COUNT,BUSINESS_INITIATED_TOTAL,AUTHENTICATION_COUNT,AUTHENTICATION_TOTAL,SERVICE_COUNT,SERVICE_TOTAL,MARKETING_COUNT,MARKETING_TOTAL,UTILITY_COUNT,UTILITY_TOTAL,CREATED_ON,CREATED_BY,UPDATED_ON,UPDATED_BY,INV_URL,INV_MONTH,INV_YEAR) VALUES (%s,%s,%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"


def run():
    
  try:
    
      pdf_file = "transaction.pdf"
      file = "output.csv"
      oldPdfReader.read_pdf(pdf_file)
      
      data_cleaning(file)
      data_table = create_dataframe() 
      computing_totals(data_table,pdf_file)
      cursor,connection = establish_connection()
      response = insert_database(cursor , connection)
      print(sql_values)
      close_connection(cursor , connection)
      # delete_files()
      return response
  
  except FileNotFoundError as e:
        print(f"Error: File not found: {pdf_file}")
  except Exception as ex:
        print(f"An unexpected error occurred: {ex}")
        
