import mysql.connector, mysql
def establish_connection():
  
  try:

    connection = mysql.connector.connect(
        host="localhost",
        user="root",
        password="haziq123",
        database="billing_meta_invoice",
        port='3306'
    )
    cursor = connection.cursor()
    return cursor, connection
  
  except mysql.connector.Error as e:
    print(f"Error: Failed to connect to the database: {e}")


def close_connection(cursor , connection):
    cursor.close()
    connection.close()