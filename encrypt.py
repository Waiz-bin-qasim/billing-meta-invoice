from cryptography.fernet import Fernet

# Generate a random encryption key
key = 'KeB09b_ZfiFP1VZ-ui5NFyTGRadlDff844ueoU9IiJc='
cipher_suite = Fernet(key)


plaintext = input("Enter Password:")

cipher_text = cipher_suite.encrypt(plaintext.encode())
print(cipher_text)


