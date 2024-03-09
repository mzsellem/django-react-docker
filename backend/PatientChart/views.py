from django.http import HttpResponse

# what we will see on the page we are trying to route to
def index(request):
    return HttpResponse("Hello, world. You're at the index page.")

def patients(request):
    return HttpResponse("Hello, you're at the patients page.")
