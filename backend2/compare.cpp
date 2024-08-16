#include <iostream>

class Parent
{

public:
    int a;
    Parent(int);
    // ~Parent();
};

Parent::Parent(int _a)
{
    a = _a;
}

class Child: public Parent
{
public:
    Child();

};

Child::Child():Parent(0)
{

}

int main()
{
    Parent p(10);
    Child c;

    std::cout << c.a;
    return 0;
}