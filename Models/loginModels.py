import mysql.connector
import mysql
import jwt
from Config.dbConfig import establish_connection
def loginCheck(param1,param2):
    cursor,connection = establish_connection()
    sql_query = "SELECT password from login_credentials where username = %s"
    cursor.execute(sql_query,(param1))
    record = cursor.fetchone()
    print(param2)

    if record[0] == param2[0]:
        token = jwt.encode({'user' :param1, 'exp' : datetime.datetime.utcnow() + datetime.timedelta(hours=24)}, app.config['JWT_SECRET_KEY'])
        response = make_response("Cookie set and login successful!")
        response.set_cookie('token', token, max_age=3600, httponly=True)
        return response
    return 0