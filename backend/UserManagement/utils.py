import pyotp
from datetime import timedelta
import jwt, datetime

def send_otp(request):
    totp = pyotp.TOTP(pyotp.random_base32(), interval=60)
    otp = totp.now()# this what the user input should be
    request.session['otp_secret_key'] = totp.secret
    valid_date = datetime.now() + timedelta(minutes=1)
    request.session['otp_valid_date'] = str(valid_date)
    
    print(f"one time password: {otp}")
    
    
def generate_random_digits(n=6):
    return "".join(map(str, random.sample(range(0, 10), n)))


def create_access_token(id):
    playlod = {
        'id': id,
        'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=60),#it will despire after one minute
        'iat': datetime.datetime.utcnow(),#date which the token is created
    }
    token = jwt.encode(playlod, 'access_secret', algorithm='HS256')
    return token


def create_refresh_token(id):
    playlod = {
        'id': id,
        'exp': datetime.datetime.utcnow() + datetime.timedelta(days=7),#it will despire after one minute
        'iat': datetime.datetime.utcnow(),#date which the token is created
    }
    token = jwt.encode(playlod, 'refresh_secret', algorithm='HS256')
    return token