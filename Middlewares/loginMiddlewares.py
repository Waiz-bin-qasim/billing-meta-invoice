from functools import wraps,partial
import jwt
from flask import jsonify, current_app

def token_required(f):
    secret_key = current_app.config.get('SECRET_KEY')
    @wraps(f)
    def decorated(*args,**kwargs):
        
        try:
            if 'token' in request.cookies:
                token = request.cookies['token']
                data = jwt.decode(token,secret_key,algorithms=["HS256"]) 
                
            
        except:
            return jsonify({'message': 'invalid token'}), 401
        return f(*args, **kwargs)
    return decorated