# Generated by Django 4.2.1 on 2023-05-19 14:34

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Sightings',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('sighting_datetime', models.DateTimeField()),
                ('animal_species', models.CharField(max_length=100)),
            ],
        ),
    ]
