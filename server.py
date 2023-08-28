from flask import Flask, render_template, request,jsonify,make_response,send_file,redirect,url_for,g, Blueprint
from flask_jwt_extended import JWTManager, jwt_required, get_jwt, get_jwt_identity, verify_jwt_in_request
from functools import wraps,partial
import jwt
import datetime
# from Middlewares.loginMiddlewares import token_required
import dataHandler
# import getCsv
import os
from multiprocessing import Process
import threading
from Models.loginModels import loginCheck
# import computations

#initialising the server
app = Flask(__name__,template_folder='template')
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY')  

def token_required(f):
    
    @wraps(f)
    def decorated(*args,**kwargs):
        
        try:
            if 'token' in request.cookies:
                token = request.cookies['token']
                data = jwt.decode(token,app.config['SECRET_KEY'],algorithms=["HS256"]) 
                
            
        except:
            return jsonify({'message': 'invalid token'}), 401
        return f(*args, **kwargs)
    return decorated

# #token verified before executing
@app.route('/upload', methods=['POST'])
@token_required
def upload():

    try:
        data = request.form
        parserChoice = data.get('parserChoice')
        
        file = request.files['file']
        if file.filename == '':
            return 'No file selected'
        file.save('transaction.pdf')
        sql_values = []
        response = dataHandler.run(sql_values,parserChoice)
        return jsonify(response)
    
    except Exception as ex:
        print(f'Error during file upload: {ex}')
        return jsonify({'message': 'An error occurred during file upload.'}), 500





# @app.route('/downloadcsv', methods = ['GET'])
# @token_required
# def downloadcsv():
#     try:
#         param1 = request.args.get('param1')
#         param2 = request.args.get('param2')
#         if param1 and param2:
        
#             file_path = getCsv.run(param1, param2)
#             g.file_path = file_path
#             return send_file(file_path, as_attachment=True, download_name=f'{param1+param2}.xlsx'),200
#         else:
#             return "Please provide both param1 and param2 as query parameters.", 400
#     except Exception as ex:
#         print(f"Error during file download: {ex}")
#         return jsonify({'message': 'ERROR'}), 500   
# @app.after_request
# def after_request_func(response):
#     file_path = getattr(g, 'file_path', None)
#     print(file_path)
#     if file_path and os.path.exists(file_path):
#         start_time = threading.Timer(10, partial(fun, name=file_path))
#         start_time.start()
#     return response
    


#for making token
@app.route('/login',methods = ['POST'])
def login():
    
    try: 

        auth = request.authorization
        authUsername = [auth.username]
        authPassword = [auth.password]
        print(authUsername)
        response = loginCheck(authUsername,authPassword)
        if response != 0:
            # return redirect(url_for('upload'),code=307)
            return jsonify({'token' : response})
        else:
            return jsonify({'message':'incorrect credentials'})
        
    except Exception as ex:
     print(f'Error during login: {ex}')
     return jsonify({'message': 'An error occurred during login.'}), 500

# def fun(name):
#     os.remove(name)

#server starting
if __name__ == '__main__':
    app.run(debug=True,port=8090)
