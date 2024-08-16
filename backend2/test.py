
def decorator(fun):
    def add_flown(*args, **kwargs):
        x = fun(*args, **kwargs)
        return x + "flawon"
    return add_flown

@decorator

def fun1(a, b):
    return a + b

# print(fun1("hi", "ho"))



class ParentClass():

    def __init__(self):
        self.name = "ParentClass"
        self.a = 5


class ParentClass2():

    def __init__(self):
        self.name2 = "ParentClas222"
        # self.a = 5
        
class ChildClass(ParentClass2, ParentClass):
    # pass
    def __init__(self, name):
        super(ParentClass2, self).__init__()
        super(ParentClass, self).__init__()
        # self.name = name
        # self.name = name
        
# Python program showing
# how MRO works

class A:
    def rk(self):
        print(" In class A")
class B(A):
    def rk(self):
        print(" In class B")
class C(A):
    def r(self):
        print("In class C")

# classes ordering
class D(C, B):
    pass
   
r = D()
r.rk()
r.r()