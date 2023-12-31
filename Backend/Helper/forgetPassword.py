from Config.dbConfig import establish_connection, close_connection
from Helper.loginHelpers import passwordEncrypt,passwordDecrypt
import secrets
def confirmEmail(email):
    try:
        cursor,connection = establish_connection()
        queryEmail = 'SELECT username from login_credentials where username = %s'
        queryInsert = 'UPDATE login_credentials SET token = %s WHERE username = %s'
          
        cursor.execute(queryEmail,(email))
        result = cursor.fetchone()
        print(result)
        email = str(email)
        
        if(result):
            token = secrets.token_hex(16)
            cursor.execute(queryInsert,(token,result[0]))
            connection.commit()
            return token
            
        return 0
    except Exception as ex:
        print(ex)


def checkToken(email,token):
    try:
        cursor,connection = establish_connection()
        queryToken = 'Select token from login_credentials where username = %s and token = %s'
        cursor.execute(queryToken,(email,token))
        result = cursor.fetchone()
        if result:
            return 1
        return 0
    except Exception as ex:
        print(ex)
        
        
def setPassword(email,newPassword):
    try:
        encryptedPassword = passwordEncrypt(newPassword)
        queryPassword = 'UPDATE login_credentials SET password = %s WHERE username = %s'
        cursor,connection = establish_connection()
        cursor.execute(queryPassword,(encryptedPassword,email))
        connection.commit()
        return 1
    except Exception as ex:
        print(ex)
        
# def checkOldPass(email,oldPassword,newPassword):
#     try:
        
#         checkPass = 'select password from login_credentials where username = %s '
#         cursor,connection = establish_connection()
#         email = [email]
#         cursor.execute(checkPass,(email))
#         result = cursor.fetchone()
#         print(result)
#         decryptedPassword = passwordDecrypt(result[0])
#         if oldPassword == decryptedPassword:
#             setPassword(email,newPassword)
#             return 1
#         return 0
#     except Exception as ex:
#         print(ex)