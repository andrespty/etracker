from django.shortcuts import render
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import MyTokenObtainPairSerializer
from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import CreateUserSerializer
from rest_framework.decorators import api_view, permission_classes
from .models import *
from .serializers import *
import json

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer
    
class CreateUserView(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        print('HELLO')
        serializer = CreateUserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            if user: 
                json = serializer.data
                return Response({"success":True, "data":json}, status=status.HTTP_201_CREATED)
                
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['GET'])
def UserActions(request, email):
    user = User.objects.get(email = email)
    return Response({"success":True,'data': CreateUserSerializer(user).data})
    
@api_view(['GET', 'POST', 'DELETE'])
def ExpenseActionsCRUD(request, userID='', month='', year='', paymentID='', expenseID=''):
    response = None
    if request.method == 'GET':
        user = User.objects.get(id=userID)
        if paymentID == 0:
            expenses = user.expenses.filter(date__year=year, date__month=month)
        else:
            expenses = user.expenses.filter(date__year=year, date__month=month, paymentMethod=paymentID)
        response = ExpenseSerializer(expenses, many=True).data
        
    elif request.method == 'DELETE':
        if expenseID == 0:
            response = {}
        else:
            Expense.objects.get(pk=expenseID).delete()
            response = {'deleted': True}
        
    elif request.method == 'POST':
        data = json.loads(request.body)
        user = User.objects.get(id = data['creator'])
        payment = PaymentMethod.objects.get(id = data['paymentID'])
        categories = Category.objects.filter(id__in=data['categoriesIDs'])
        
        expense = Expense.objects.create(
            name            = data['name'],
            amount          = data['amount'],
            date            = data['date'],
            paymentMethod   = payment,
            creator         = user
        )
        expense.categories.set(categories)
        response = ExpenseSerializer(expense).data
        
    return Response({"success":True,'data': response})

@api_view(['GET', 'POST'])
def CategoryActionsCRUD(request, userID=''):
    response = None
    if request.method == 'GET':
        user = User.objects.get(id=userID)
        categories = Category.objects.filter(creator=user)
        response = CategorySerializer(categories, many=True).data
        
    elif request.method == 'POST':
        print(request.body)
        data = json.loads(request.body)
        user = User.objects.get(id = data['creator'])
        category = Category.objects.create(
            name    = data['name'],
            creator = user
        )
        response = CategorySerializer(category).data
    
    return Response({"success":True,'data': response})

@api_view(['GET', 'POST', 'DELETE', 'PUT'])
def PaymentMethodActionsCRUD(request, userID='', paymentID=''):
    response = None
    if request.method == 'GET':
        user = User.objects.get(id=userID)
        payments = PaymentMethod.objects.filter(creator=user)
        response = PaymentMethodSerializer(payments, many=True).data
        
    elif request.method == 'DELETE':
        if paymentID == 0:
            response = {}
        else: 
            PaymentMethod.objects.get(pk=paymentID).delete()
            response = {'deleted': True}
    
    elif request.method == 'PUT':
        data = json.loads(request.body)
        payment = PaymentMethod.objects.get(pk=data['id'])
        payment.name = data['name']
        payment.save()
        response = PaymentMethodSerializer(payment).data
    
    elif request.method == 'POST':
        data = json.loads(request.body)
        user = User.objects.get(id = data['creator'])
        payment = PaymentMethod.objects.create(
            name    = data['name'],
            creator = user
        )
        response = CategorySerializer(payment).data
    
    return Response({"success":True,'data': response})

@api_view(['GET'])
def FirstLoad(request, userID):
    
    user = User.objects.get(id=userID)
    if user:
        payments = PaymentMethodSerializer(user.paymentMethods.all(), many=True).data
        categories = CategorySerializer(user.categories.all(), many=True).data
        
        return Response({'success': True, "data": {
            "paymentMethods": payments,
            "categories": categories
        }})
    return Response({ "success":False })

@api_view(['GET'])
def ExpensesQuery(request, userID, month, year):
    user = User.objects.get(id=userID)
    if user:
        expenses = ExpenseSerializer(user.expenses.filter(date__year=year, date__month=month).order_by('-date'), many=True).data
        
        return Response({'success': True, "data": {
            "expenses": expenses
        }})
    return Response({ "success":False })