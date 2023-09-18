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
from flask_socketio import SocketIO
from Sockets.sockets import showBar
from Sockets.sockets import updateProgress
# import computations

#initialising the server
IMG = os.path.join('Static', 'Img')

app = Flask(__name__)
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY')  
app.config['ENCRYPT_KEY'] = os.environ.get('ENCRYPT_KEY')
socketio = SocketIO(app)
app.config['sideBarImage'] = IMG

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
            updateProgress(socketio,"ascsac",20)
            data = request.form
            parserChoice = data.get('parserChoice')
            print(parserChoice)
            file = request.files['file']
            if file.filename == '':
                raise Exception('No file selected')
            file.save('transaction.pdf')
            sql_values = []
            print(user[0])
            updateProgress(socketio,"ascsac",35)
            if(checkBillingLogs(parserChoice) == True):
                updateProgress(socketio,"ascsac",50)
                response = dataHandler.run(sql_values,parserChoice,user[0],socketio)
                updateProgress(socketio,"ascsac",90)
                if response['message'] == 'failed':
                    return jsonify(response),400
                return jsonify(response),200
            else:
                updateProgress(socketio,"ascsac",90)
                return jsonify({'message': 'Meta Invoice Already Exists'}), 400
        else:
            data = getAllBilling()
            fileName = os.path.join(app.config['sideBarImage'],'dc-new-logo.png')
            return render_template('MetaInvoice.html',data=data,image_src= fileName)
    except Exception as ex:
        print(f'Error during file upload: {ex}')
        return jsonify({'message': 'An error occurred during file upload.'}), 400


#for making token
@app.route('/',methods = ['POST',"GET"])
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
               return jsonify({"message":"Incorrect Credentials"}),401
        else:
            return render_template('Login.html')
            
    except (NameError, TypeError) as error:
     print(error)
     return jsonify({error}), 400

@app.route('/downloadcsv', methods = ['GET'])
@token_required
def downloadcsv(user):
    try:
            fileName = os.listdir("excel/")
            response = []
            count = 0
            for name in fileName:
                response.append([count+1,name.split('.')[0]]) 
                count +=1
            return render_template("Reports.html",data = response)
    except Exception as ex:
        print(f"Error during file download: {ex}")
        return jsonify({'Error Occured' : ex}), 500  

@app.route('/mau/upload',methods = ['POST',"GET"])
@token_required
def mau(user):
    try:
         if request.method == "POST":
            updateProgress(socketio,"a",20)
            print(user[0])
            data = request.form
            file = request.files['file']
            if file.filename == '':
                raise Exception('No file selected')
            file.save("MAU.xlsx")
            updateProgress(socketio,"a",30)
            if (checkMauLogs() == True):
                updateProgress(socketio,"a",40)
                response = parseMAUFile(user[0],socketio)
                updateProgress(socketio,"a",80)
                return jsonify(response)
            else:
                updateProgress(socketio,"a",80)
                return jsonify({'error': 'Bad Request'}), 400
            
         else:
             data = getAllMau()
             return render_template("Billing.html",data=data)
    except Exception as ex:
     print(ex)
     print(f'Error during upload: {ex}')
     return jsonify({'Error Occured' : ex}), 400

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
     return jsonify({'Error Occured' : ex}), 500


@app.route('/generatecsv/<socketId>',methods = ['POST'])
@token_required
def generateCsv(user,socketId):
    try:
        param1 = request.args.get('param1')
        param2 = request.args.get('param2')
        if param1 and param2:
            updateProgress(socketio,socketId,20)
            response = generateCheck(param1,param2)
            if(response == True):
                updateProgress(socketio,socketId,40)
                file_path = getCsv.run(param1, param2,socketio,socketId)
                g.file_path = file_path
                updateProgress(socketio,socketId,100)
                return jsonify("File was Generated")
            else:
                updateProgress(socketio,socketId,40)
                print(response)
                return jsonify(response),400
        else:
            return jsonify({"message":"Please provide both param1 and param2 as query parameters."}),400
    except Exception as e:
        # print(f'Error during generating file: {e}')
        return jsonify({'Error Ocurred': e}), 400 

@app.route('/getcsv', methods = ['GET'])
@token_required
def getcsv(user):
    try:
        param1 = request.args.get('param1')
        param2 = request.args.get('param2')
        if param1 and param2:
            file_path = "./excel/"+param1+param2+".xlsx"
            return send_file(file_path, as_attachment=True, download_name=f'{param1+param2}.xlsx'),200
        else:
            raise Exception("Please provide both param1 and param2 as query parameters.")
    except Exception as e:
        print(f"Error during file download: {e}")
        return jsonify({'Error Occured' : e}), 400 


#server starting
if __name__ == '__main__':
    app.run(debug=True,port=8090)
