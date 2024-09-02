import pyotp
from datetime import datetime, timedelta

def send_otp(request):
    totp = pyotp.TOTP(pyotp.random_base32(), interval=60)
    otp = totp.now()# this what the user input should be
    request.session['otp_secret_key'] = totp.secret
    valid_date = datetime.now() + timedelta(minutes=1)
    request.session['otp_valid_date'] = str(valid_date)
    
    print(f"one time password: {otp}")
    
    
def generate_random_digits(n=6):
    return "".join(map(str, random.sample(range(0, 10), n)))
