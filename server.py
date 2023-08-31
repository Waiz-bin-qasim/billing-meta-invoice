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
import os
# import computations

#initialising the server
app = Flask(__name__)
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY')  


def token_required(f):
    
    @wraps(f)
    def decorated(*args,**kwargs):
        
        try:
            if 'token' in request.cookies:
                token = request.cookies['token']
                data = jwt.decode(token,app.config['SECRET_KEY'],algorithms=["HS256"]) 
            else:
                return jsonify({"message":"Unauthorized"})
            
        except:
            return jsonify({'message': 'invalid token'}), 401
        return f(*args, **kwargs)
    return decorated

# #token verified before executing
@app.route('/upload', methods=['POST',"GET"])
@token_required
def upload():

    try:
        if request.method == "POST":
            data = request.form
            parserChoice = data.get('parserChoice')
            print(request)
            print(parserChoice)
            file = request.files['file']
            if file.filename == '':
                return 'No file selected'
            file.save('transaction.pdf')
            sql_values = []
            response = dataHandler.run(sql_values,parserChoice)
            return jsonify(response)
        else:
            return render_template("Upload.html")
        
    except Exception as ex:
        print(f'Error during file upload: {ex}')
        return jsonify({'message': 'An error occurred during file upload.'}), 500

@app.route('/downloadcsv', methods = ['GET'])
@token_required
def downloadcsv():
    try:
        param1 = request.args.get('param1')
        param2 = request.args.get('param2')
        if param1 and param2:
        
            file_path = getCsv.run(param1, param2)
            g.file_path = file_path
            return send_file(file_path, as_attachment=True, download_name=f'{param1+param2}.xlsx'),200
        else:
            return "Please provide both param1 and param2 as query parameters.", 400
    except Exception as ex:
        print(f"Error during file download: {ex}")
        return jsonify({'message': 'ERROR'}), 500   
# @app.after_request
# def after_request_func(response):
#     file_path = getattr(g, 'file_path', None)
#     print(file_path)
#     if file_path and os.path.exists(file_path):
#         start_time = threading.Timer(10, partial(fun, name=file_path))
#         start_time.start()
#     return response


#for making token
@app.route('/login',methods = ['POST',"GET"])
def login():
    try: 
        if request.method == "POST":
            auth = request.get_json()
            authUsername = [auth['username']]
            authPassword = [auth['password']]
            print(authUsername)
            response = loginCheck(authUsername,(authPassword))
            if authPassword[0] == '12345':
                # return redirect(url_for('upload'),code=307)
                return jsonify({'token' : response})
            else:
                return jsonify({'message':'incorrect credentials'})
        else:
            return render_template("Login.html")
            
    except Exception as ex:
     print(ex)
     print(f'Error during login: {ex}')
     return jsonify({'message': 'An error occurred during login.'}), 500

@app.route('/mau/upload',methods = ['POST',"GET"])
@token_required
def mau():
    try:
        if request.method == "POST":
            data = request.form
            file = request.files['file']
            if file.filename == '':
                return 'No file selected'
            file.save("MAU.xlsx")
            MAU = parseMAUFile(file)
            res = insertMAU(MAU)
            return jsonify(res)
        else:
            render_template("UploadMetaInvoice.html")
    except Exception as ex:
     print(ex)
     print(f'Error during login: {ex}')
     return jsonify({'message': 'An error occurred during login.'}), 500 

@app.route('/file',methods = ["GET"])
def file():
    return render_template("Login.html") 

#server starting
if __name__ == '__main__':
    app.run(debug=True,port=8090)
