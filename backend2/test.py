
def decorator(fun):
    def add_flown(*args, **kwargs):
        x = fun(*args, **kwargs)
        return x + "flawon"
    return add_flown

@decorator

def fun1(a, b):
    return a + b

print(fun1("hi", "ho"))