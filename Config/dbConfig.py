import mysql.connector, mysql
def establish_connection():
  
  try:

    connection = mysql.connector.connect(
        host="metabilling.cd15hwmp9bbp.ap-southeast-1.rds.amazonaws.com",
        user="admin",
        password="Karachi123",
        database="billing",
        port='3306'
    )
    cursor = connection.cursor()
    return cursor, connection
  
  except mysql.connector.Error as e:
    print(f"Error: Failed to connect to the database: {e}")


def close_connection(cursor , connection):
    cursor.close()
    connection.close()