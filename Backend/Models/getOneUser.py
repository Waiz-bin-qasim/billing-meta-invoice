import mysql.connector
import mysql
import jwt
import datetime
from flask import make_response, current_app
from Config.dbConfig import establish_connection

def oneUser(email):
    try:
        secret_key = current_app.config.get('SECRET_KEY')
        cursor,connection = establish_connection()
        sql_query = "SELECT USERNAME,FIRST_NAME,LAST_NAME,ROLE_ID,STATUS FROM LOGIN_CREDENTIALS WHERE USERNAME = %s"
        cursor.execute(sql_query,(email))
        record = cursor.fetchone()
        if record is not None:
            return record
        raise Exception({"message":"Record Not Found"})
    except Exception as ex:
        raise Exception(ex)