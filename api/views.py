from django.shortcuts import render
from django.http import response
from .models import Note
from .serializers import NoteSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.serializers import Serializer
from api import serializers

# Create your views here.

@api_view(['GET'])
def getNotesList(request):
    notes = Note.objects.all().order_by('-updated')
    serializer = NoteSerializer(notes, many = True)

    return Response (serializer.data)

@api_view(['GET'])
def getNote(request , pk):
    note = Note.objects.get(id=pk)
    serializer = NoteSerializer(note , many = False)
    return Response(serializer.data)

@api_view(['POST'])
def createNote(request):
    data = request.data
    note = Note.objects.create(
        body = data['body']
    )
    serializer = NoteSerializer(note , many = False)
    

    return Response(serializer.data)

@api_view(['PUT'])
def updateNote(request , pk):
    data = request.data
    note = Note.objects.get(id=pk)
    serializer = NoteSerializer(instance=note , data =data)

    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data) 

@api_view(['DELETE'])
def deleteNote(request,pk):
    note = Note.objects.get(id=pk)
    note.delete()
    return Response('Note was Deleted')
    
       
    