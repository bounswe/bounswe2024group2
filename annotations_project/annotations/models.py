from django.db import models
from django.utils.timezone import now


class Body(models.Model):
    type = models.CharField(max_length=255, default="TextualBody")
    value = models.TextField()
    format = models.CharField(max_length=50, default="text/plain")  
    language = models.CharField(max_length=10, default="en")  

    def __str__(self):
        return self.value[:50] 


class Selector(models.Model):
    type = models.CharField(max_length=255, default="TextPositionSelector")
    start = models.PositiveIntegerField()
    end = models.PositiveIntegerField()
    source = models.URLField()  

    def __str__(self):
        return f"{self.source} [{self.start}:{self.end}]" 


class Creator(models.Model):
    type = models.CharField(max_length=50, default="Person")  # 'Person', 'Agent'
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name


class Generator(models.Model):
    type = models.CharField(max_length=50, default="Software")
    name = models.CharField(max_length=255)
    homepage = models.URLField(blank=True, null=True)

    def __str__(self):
        return self.name


class Annotation(models.Model):
    type = models.CharField(max_length=255, default="Annotation")
    body = models.ForeignKey(Body, on_delete=models.CASCADE)  
    target = models.ForeignKey(Selector, on_delete=models.CASCADE) 
    creator = models.ForeignKey(Creator, on_delete=models.CASCADE)  
    generator = models.ForeignKey(Generator, on_delete=models.SET_NULL, blank=True, null=True)
    created = models.DateTimeField(default=now)
    modified = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Annotation on {self.target.source} by {self.creator.name}" 