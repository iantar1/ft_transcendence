def new_middleware(get_response):

    def middleware(request):
        print('before')
        response = get_response(request)
        print(f"response: {response}")
        return response

    return middleware


# from .views import get_user_by_token
# from rest_framework.exceptions import AuthenticationFailed

# def new_middleware(get_response):

#     def middleware(request):
#         token = request.COOKIES.get('access')
#         user = get_user_by_token(token)
#         if user == None:
#             raise AuthenticationFailed('11Unauthenticated')
#         response = get_response(request)
#         print(f"response: {response}")
#         return response

#     return middleware