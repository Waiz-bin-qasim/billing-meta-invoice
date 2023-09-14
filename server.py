from flask import Flask, render_template, request,jsonify,make_response,send_file,redirect,url_for,g, Blueprint
from flask_jwt_extended import JWTManager, jwt_required, get_jwt, get_jwt_identity, verify_jwt_in_request
from functools import wraps,partial
import jwt
import datetime
# from Middlewares.loginMiddlewares import token_required
import dataHandler
import getCsv
import os
from multiprocessing import Process
import threading
from Models.loginModels import loginCheck
from Helper.MAU import parseMAUFile
from Helper.loginHelpers import passwordDecrypt
from Helper.mauHelpers import checkMauLogs, getAllMau
from Helper.billingHelpers import getAllBilling, checkBillingLogs
from Helper.csvHelpers import generateCheck
# import computations

#initialising the server
app = Flask(__name__)
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY')  
app.config['ENCRYPT_KEY'] = os.environ.get('ENCRYPT_KEY')

def token_required(f):
    
    @wraps(f)
    def decorated(*args, **kwargs):
        
        try:
            if 'token' in request.cookies:
                token = request.cookies['token']
                data = jwt.decode(token, app.config['SECRET_KEY'], algorithms=["HS256"]) 
                
                # Extract the 'user' value from the decoded token
                user = data.get('user')
                if user is None:
                    return jsonify({'message': 'Invalid token: user not found'}), 401
                
                # Pass the 'user' as a keyword argument to the wrapped function
                kwargs['user'] = user
            
        except jwt.ExpiredSignatureError:
            return jsonify({'message': 'Token has expired'}), 401
        except jwt.InvalidTokenError:
            return jsonify({'message': 'Invalid token'}), 401
        return f(*args, **kwargs)
    
    return decorated

# #token verified before executing
@app.route('/upload', methods=['POST',"GET"])
@token_required
def upload(user):

    try:
        if request.method == "POST":
            data = request.form
            parserChoice = data.get('parserChoice')
            print(parserChoice)
            file = request.files['file']
            if file.filename == '':
                return 'No file selected'
            file.save('transaction.pdf')
            sql_values = []
            print(user[0])
            # raise Exception("waiz")
            if(checkBillingLogs(parserChoice) == True):
                response = dataHandler.run(sql_values,parserChoice,user[0])
                print("waiz")
                return jsonify(response)
            else:
                return jsonify({'message': 'Bad Request'}), 400
            # response = dataHandler.run(sql_values,parserChoice,user[0])
            # return jsonify(response)  
        else:
            data = getAllBilling()
            return render_template('MetaInvoice.html')
    except Exception as ex:
        print(f'Error during file upload: {ex}')
        return jsonify({'message': 'An error occurred during file upload.'}), 400


#for making token
@app.route('/login',methods = ['POST',"GET"])
def login():
    
    try: 
        if request.method == "POST":
            auth = request.form
            print(auth)
            authUsername = [auth['username']]
            authPassword = [auth["password"]]
            print(authPassword)
            response = loginCheck(authUsername,(authPassword))
            if response != 0:
                # return redirect(url_for('upload'),code=307)
                return jsonify({'token' : response})
            else:
                return jsonify({'message':'incorrect credentials'})
        else:
            return render_template('Login.html')
            
    except Exception as ex:
     print(ex)
     print(f'Error during login: {ex}')
     return jsonify({'message': 'An error occurred during login.'}), 500

@app.route('/downloadcsv', methods = ['GET'])
@token_required
def downloadcsv(user):
    try:
            return render_template("Download.html")
    except Exception as ex:
        print(f"Error during file download: {ex}")
        return jsonify({'message': 'ERROR'}), 500   

@app.route('/mau/upload',methods = ['POST',"GET"])
@token_required
def mau(user):
    try:
         if request.method == "POST":
            data = request.form
            file = request.files['file']
            if file.filename == '':
                return 'No file selected'
            file.save("MAU.xlsx")
            if (checkMauLogs() == True):
                response = parseMAUFile(user[0])
                return jsonify(response)
            else:
                return jsonify({'error': 'Bad Request'}), 400
            
         else:
             data = getAllMau()
             return render_template("UploadBillingReport.html")
    except Exception as ex:
     print(ex)
     print(f'Error during upload: {ex}')
     return jsonify({'message': 'An error occurred during upload.'}), 500 

@app.route('/files',methods = ['GET'])
# @token_required
def files():
    try:
        fileName = os.listdir("excel/")
        response = []
        for name in fileName:
            response.append(name.split('.')[0]) 
        return jsonify(response)
    except Exception as ex:
     print(ex)
     print(f'Error during login: {ex}')
     return jsonify({'message': 'An error occurred during login.'}), 500 


@app.route('/generatecsv',methods = ['POST'])
# @token_required
def generateCsv():
    try:
        param1 = request.args.get('param1')
        param2 = request.args.get('param2')
        if param1 and param2:
            if(generateCheck() == True):
                file_path = getCsv.run(param1, param2)
                g.file_path = file_path
                return jsonify("File was Generated")
            else:
                response = generateCheck()
                return response
        else:
            return "Please provide both param1 and param2 as query parameters.", 400
    except Exception as e:
        print(f'Error during generating file: {e}')
        return jsonify({'message': 'An error occurred during generating csv.'}), 400 

@app.route('/getcsv', methods = ['GET'])
# @token_required
def getcsv():
    try:
        param1 = request.args.get('param1')
        param2 = request.args.get('param2')
        if param1 and param2:
            file_path = "./excel/"+param1+param2+".xlsx"
            return send_file(file_path, as_attachment=True, download_name=f'{param1+param2}.xlsx'),200
        else:
            return "Please provide both param1 and param2 as query parameters.", 400
    except Exception as e:
        print(f"Error during file download: {e}")
        return jsonify({'message': 'ERROR'}), 500   


#server starting
if __name__ == '__main__':
    app.run(debug=True,port=8090)
