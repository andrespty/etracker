from datetime import date
from sre_parse import CATEGORIES
from unicodedata import name
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _
from .managers import CustomUserManager


class User(AbstractUser):
    username = None
    email = models.EmailField(_('email address'), unique=True)
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []
    
    objects = CustomUserManager()
    
    def __str__(self):
        return self.email

class Category(models.Model):
    name        = models.CharField(max_length=32)
    creator     = models.ForeignKey(User, on_delete=models.CASCADE, related_name='categories')
    bgColor     = models.CharField(max_length=10, default='#68D391')
    color       = models.CharField(max_length=10, default='#0B6F83')
    
    def __str__(self):
        return self.name
    
class PaymentMethod(models.Model):
    name        = models.CharField(max_length=32)
    creator     = models.ForeignKey(User, on_delete=models.CASCADE, related_name='paymentMethods')
    bgColor     = models.CharField(max_length=10, default='#329795')
    color       = models.CharField(max_length=10, default='white')
    
    def __str__(self):
        return self.name

class Expense(models.Model):
    name            = models.CharField(max_length=32)
    amount          = models.DecimalField(decimal_places=2, max_digits=10)
    date            = models.DateField()
    categories      = models.ManyToManyField(Category, related_name='expenses')
    paymentMethod   = models.ForeignKey(PaymentMethod, on_delete=models.CASCADE, related_name='expenses')
    creator         = models.ForeignKey(User, on_delete=models.CASCADE, related_name='expenses')
    
    def __str__(self):
        return self.name