from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers
from .models import *

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        token['email'] = user.email
        token['first_name'] = user.first_name
        token['last_name'] = user.last_name
        token['id'] = user.id

        return token
    
    def validate(self, attrs):
        data = super().validate(attrs)
        refresh = self.get_token(self.user)
        data['refresh'] = str(refresh)
        data['access'] = str(refresh.access_token)
        
        data['paymentMethods'] = PaymentMethodSerializer(self.user.paymentMethods.all(), many=True).data
        
        return {"success":True, "data": data}
    
    
class CreateUserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(min_length=6, write_only=True)
    token = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ('id','email','password', 'first_name', 'last_name', 'token')
        extra_kwargs = {'password': {'write_only':True}}

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance
 
    def get_token(self, obj):
        token = MyTokenObtainPairSerializer.get_token(obj)
        return {'access':f'{token.access_token}', 'refresh': f'{token}'}

class CategorySerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Category
        fields = ['id','name', 'creator', 'bgColor', 'color']

class PaymentMethodSerializer(serializers.ModelSerializer):
    class Meta: 
        model = PaymentMethod
        fields = ['id', 'name', 'creator', 'bgColor', 'color']
        
class ExpenseSerializer(serializers.ModelSerializer):
    
    categories = CategorySerializer(many=True)
    paymentMethod = PaymentMethodSerializer()
    
    class Meta:
        model = Expense
        fields = ['id', 'name', 'amount', 'date', 'categories', 'paymentMethod']