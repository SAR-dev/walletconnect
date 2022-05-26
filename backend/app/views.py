from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
# Creating view for landing page
def home(request):
    if request.method == "POST":
        username=request.POST.get('name')
        u_upercase = username.upper()
        context = {
            "printdata" : u_upercase
            
        }
        return render(request, 'index.html',context)
    return render(request, 'index.html')



