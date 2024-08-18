from django.urls import path
from . import views

urlpatterns = [
    path('notes/', views.getNotesList, name='note-list'),
    path('notes/create/', views.createNote, name='create-note'),  # Moved this above the <pk> patterns
    path('notes/<str:pk>/', views.getNote, name='note'),
    path('notes/<str:pk>/update/', views.updateNote, name='update-note'),
    path('notes/<str:pk>/delete/', views.deleteNote, name='delete-note'),
]
