# Generated by Django 4.2.1 on 2023-05-16 21:16

import datetime
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('appOneDrop', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='paciente',
            old_name='apellido',
            new_name='apellido_paciente',
        ),
        migrations.RenameField(
            model_name='paciente',
            old_name='contraseña',
            new_name='contraseña_paciente',
        ),
        migrations.RenameField(
            model_name='paciente',
            old_name='email',
            new_name='email_paciente',
        ),
        migrations.RenameField(
            model_name='paciente',
            old_name='nombre',
            new_name='nombre_paciente',
        ),
        migrations.RenameField(
            model_name='paciente',
            old_name='telefono',
            new_name='telefono_paciente',
        ),
        migrations.AddField(
            model_name='paciente',
            name='fecha_nacimiento',
            field=models.DateField(default=datetime.date.today, max_length=30),
        ),
        migrations.AddField(
            model_name='paciente',
            name='sexo_paciente',
            field=models.CharField(blank=True, max_length=30, null=True),
        ),
        migrations.CreateModel(
            name='Ficha_medica',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('tipo_diabetes', models.CharField(max_length=30)),
                ('terapia_insulina', models.CharField(max_length=30)),
                ('terapia_pastillas', models.CharField(max_length=50)),
                ('tipo_glucometro', models.CharField(max_length=100)),
                ('tipo_sensor', models.CharField(max_length=30)),
                ('comorbilidades', models.DateField(max_length=30)),
                ('objetivo_glucosa', models.DecimalField(decimal_places=2, max_digits=3)),
                ('paciente', models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='appOneDrop.paciente')),
            ],
        ),
    ]
