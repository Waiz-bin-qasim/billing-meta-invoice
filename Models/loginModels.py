import mysql.connector
import mysql
import jwt
import datetime
from flask import make_response, current_app
from Config.dbConfig import establish_connection

def loginCheck(param1,param2):
    secret_key = current_app.config.get('SECRET_KEY')
    print(secret_key)
    cursor,connection = establish_connection()
    sql_query = "SELECT password from login_credentials where username = %s"
    cursor.execute(sql_query,(param1))
    record = cursor.fetchone()
    print("waiz")
    print(param2)

    if record[0] == param2[0]:
        token = jwt.encode({'user' :param1, 'exp' : datetime.datetime.utcnow() + datetime.timedelta(hours=24)},secret_key ,algorithm="HS256")
        response = make_response("Cookie set and login successful!")
        response.set_cookie('token', token, max_age=3600, httponly=True)
        print(response.headers['Set-Cookie'])
        return token
    return 0