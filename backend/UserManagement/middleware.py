def new_middleware(get_response):

    def middleware(request):
        print('before')
        response = get_response(request)
        print(f"response: {response}")
        return response

    return middleware