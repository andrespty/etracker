from django.contrib import admin
from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from expenseTracker import views

urlpatterns = [
    path('admin/', admin.site.urls),
    
    path('firstLoad/<int:userID>/', views.FirstLoad, name='first_load'),
    path('expensesQuery/<int:userID>/<int:month>/<int:year>/', views.ExpensesQuery, name='expense_query'),
    
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('token/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    
    path('users/<str:email>/', views.UserActions, name='user_actions'),
    path('users/create/', views.CreateUserView.as_view(), name='create_user'),
    
    
    path('expense/', views.ExpenseActionsCRUD, name='expense_actions'),
    path('expense/<int:expenseID>/', views.ExpenseActionsCRUD, name='expense_actions'),
    path('expense/<int:userID>/<int:month>/<int:year>/<int:paymentID>/', views.ExpenseActionsCRUD, name='expense_actions'),
    
    path('category/', views.CategoryActionsCRUD, name='category_actions'),
    path('category/<int:userID>/', views.CategoryActionsCRUD, name='category_actions'),
    
    path('payment/', views.PaymentMethodActionsCRUD, name='payment_actions'),
    path('payment/<int:paymentID>/', views.PaymentMethodActionsCRUD, name='payment_actions'),
    path('payment/<int:userID>/', views.PaymentMethodActionsCRUD, name='payment_actions')
    
]
