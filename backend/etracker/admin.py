from django.contrib import admin
from .models import *


class UserAdmin(admin.ModelAdmin):
    model = User
    
class CategoryAdmin(admin.ModelAdmin):
    model = Category

class PaymentAdmin(admin.ModelAdmin):
    model = PaymentMethod
    
class ExpenseAdmin(admin.ModelAdmin):
    model = Expense
    
    
admin.site.register(User, UserAdmin)
admin.site.register(Category, CategoryAdmin)
admin.site.register(PaymentMethod, PaymentAdmin)
admin.site.register(Expense, ExpenseAdmin)
