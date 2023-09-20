
from cryptography.fernet import Fernet
from dotenv import load_dotenv
import os

dotenvPath = '../.env'
load_dotenv()

encryptKey = os.getenv('ENCRYPT_KEY')
print(encryptKey)

def passwordDecrypt(encryptedPassword):
    try:
        cipher_suite = Fernet(encryptKey)   
        decrypted_text = cipher_suite.decrypt(encryptedPassword).decode()
        return decrypted_text
    except Exception as ex:
        print(f"Error during password decryption: {ex}")
        raise Exception(ex)
