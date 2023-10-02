import mysql.connector
import mysql
import jwt
import datetime
from flask import make_response, current_app
from Config.dbConfig import establish_connection
from Helper.loginHelpers import passwordDecrypt

def loginCheck(param1,param2):
    try:
        secret_key = current_app.config.get('SECRET_KEY')
        cursor,connection = establish_connection()
        print(param1)
        sql_query = "SELECT org_roles.org_name, org_roles.permissions,login_credentials.password,login_credentials.first_name FROM login_credentials INNER JOIN org_roles ON login_credentials.role_id = org_roles.role_id WHERE login_credentials.username =%s"
        cursor.execute(sql_query,(param1))
        record = cursor.fetchone()
        if record is not None:
            decryptedPassword = passwordDecrypt(record[2])

            if decryptedPassword == param2[0]:
                token = jwt.encode({'user' :record[3], 'permissions' : record[1], 'exp' : datetime.datetime.utcnow() + datetime.timedelta(hours=24),"role":record[0]},secret_key ,algorithm="HS256")
                response = make_response("Cookie set and login successful!")
                response.set_cookie('token', token, max_age=3600, httponly=True)
                print(response.headers['Set-Cookie'])
                return token,record[0]
        return 0,0
    except Exception as ex:
        raise Exception(ex)