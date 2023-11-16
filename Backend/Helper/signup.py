from Config.dbConfig import establish_connection, close_connection
from Helper.loginHelpers import passwordEncrypt
import base64


def displayRoles():
    try:
        queryRole = "SELECT ROLE_ID, ROLE_NAME FROM ORG_ROLES"
        cursor, connection = establish_connection()
        cursor.execute(queryRole)
        result = cursor.fetchall()
        return result
    except Exception as ex:
        print(ex)


def displayUsers():
    try:
        cursor, connection = establish_connection()
        queryDisplayUsers = "SELECT login_credentials.username ,CONCAT(login_credentials.first_name, ' ',login_credentials.last_name) AS full_name,org_roles.role_name,login_credentials.status FROM login_credentials INNER JOIN org_roles ON login_credentials.role_id = org_roles.role_id"
        cursor.execute(queryDisplayUsers)
        result = cursor.fetchall()
        return result

    except Exception as ex:
        return {"message": "Error occurred in displaying users"}


def addUser(firstName, lastName, email, password, roleId):
    try:
        queryAddUser = "INSERT INTO login_credentials(username,password,first_name,last_name,role_id) VALUES(%s,%s,%s,%s,%s)"
        print(password)
        encryptedPassword = passwordEncrypt(password)
        encryptedPassword = encryptedPassword.decode()
        cursor, connection = establish_connection()
        cursor.execute(
            queryAddUser, (email, encryptedPassword, firstName, lastName, roleId)
        )
        connection.commit()
        return {"message": "user added", "status": 200}
    except Exception as ex:
        print(ex)
        return {
            "message": str(ex),
            "status" :400
        }


def delUser(user):
    try:
        cursor, connection = establish_connection()
        queryDelete = "Delete from login_credentials where username = %s"
        user = [user]
        cursor.execute(queryDelete, (user))
        connection.commit()
        return {"message": "user deleted", "status": 200}
    except Exception as ex:
        print(ex)
        return {"message": "error during user deletion"}


def updateUser(username, columns, values):
    try:
        sql = "UPDATE login_credentials SET "
        updates = []
        cursor, connection = establish_connection()
        for column, value in zip(columns, values):
            updates.append(f"{column} = %s")

        sql += ", ".join(updates)
        sql += " WHERE username = %s"
        print(sql)
        values.append(username)
        cursor.execute(sql, values)
        connection.commit()
        return
    except Exception as ex:
        print(ex)
        raise Exception(ex)
