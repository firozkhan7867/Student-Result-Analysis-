from django.db import migrations, models
import django.db.models.deletion
import student.models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Batch',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='Branch',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('branches', models.CharField(max_length=50)),
            ],
            options={
                'verbose_name_plural': 'Branches',
            },
        ),
        migrations.CreateModel(
            name='Regulation',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('regulation', models.CharField(max_length=50, unique=True)),
                ('year', models.CharField(max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='Semester',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=10)),
                ('subject', models.CharField(blank=True, max_length=1000)),
                ('year', models.DateTimeField(auto_now_add=True)),
                ('file', models.FileField(blank=True, upload_to=student.models.path_and_rename, verbose_name='Excel FIle')),
                ('batch', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='student.batch')),
                ('branch', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='student.branch')),
                ('regulation', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='student.regulation')),
            ],
            options={
                'verbose_name_plural': 'Semesters',
            },
        ),
        migrations.CreateModel(
            name='Student',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('roll', models.CharField(max_length=15, unique=True)),
                ('name', models.CharField(blank=True, max_length=120)),
                ('section', models.IntegerField(blank=True, default=10)),
                ('batch', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='student.batch')),
                ('branch', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='student.branch')),
                ('regulation', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='student.regulation')),
                ('sem', models.ManyToManyField(to='student.Semester')),
            ],
            options={
                'verbose_name_plural': 'Students',
            },
        ),
        migrations.CreateModel(
            name='Subjects',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=150)),
                ('code', models.CharField(max_length=20)),
                ('credit', models.FloatField()),
                ('result', models.CharField(blank=True, max_length=20)),
                ('attendance', models.CharField(blank=True, max_length=5)),
                ('grade', models.CharField(blank=True, max_length=5)),
                ('cgpa', models.FloatField()),
                ('fail', models.BooleanField(default=False)),
                ('batch', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='student.batch')),
                ('branch', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='student.branch')),
                ('regulation', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='student.regulation')),
                ('roll', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='student.student')),
                ('sem', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='student.semester')),
            ],
            options={
                'verbose_name_plural': 'Subjects',
            },
        ),
        migrations.CreateModel(
            name='Performance',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('registered', models.IntegerField(blank=True)),
                ('no_of_pass', models.IntegerField(blank=True)),
                ('TCR', models.FloatField(blank=True)),
                ('TCP', models.FloatField(blank=True)),
                ('SCGPA', models.FloatField(blank=True)),
                ('no_of_backlog', models.IntegerField()),
                ('pass_or_fail', models.BooleanField(default=True)),
                ('had_backlog', models.BooleanField(default=False)),
                ('batch', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='student.batch')),
                ('regulation', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='student.regulation')),
                ('roll', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='student.student')),
                ('sem', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='student.semester')),
                ('subject', models.ManyToManyField(to='student.Subjects')),
            ],
        ),
        migrations.AddField(
            model_name='batch',
            name='reg',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='student.regulation'),
        ),
        migrations.CreateModel(
            name='BacklogSubject',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('subj_code', models.CharField(max_length=20)),
                ('date', models.DateTimeField(auto_now_add=True)),
                ('count', models.IntegerField(default=1)),
                ('passed', models.BooleanField(default=False)),
                ('batch', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='student.batch')),
                ('branch', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='student.branch')),
                ('reg', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='student.regulation')),
                ('roll', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='student.student')),
                ('sem', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='student.semester')),
                ('subject', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='student.subjects')),
            ],
            options={
                'verbose_name_plural': 'BackLogSubject',
            },
        ),
        migrations.CreateModel(
            name='BacklogData',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateTimeField(auto_now_add=True)),
                ('file', models.FileField(blank=True, upload_to=student.models.path_and_rename_backlog, verbose_name='Excel FIle')),
                ('batch', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='student.batch')),
                ('branch', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='student.branch')),
                ('regulation', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='student.regulation')),
                ('sem', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='student.semester')),
            ],
            options={
                'verbose_name_plural': 'BackLogDATA',
            },
        ),
        migrations.CreateModel(
            name='Attempt',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('credit', models.FloatField()),
                ('result', models.CharField(blank=True, max_length=20)),
                ('attendance', models.CharField(blank=True, max_length=5)),
                ('grade', models.CharField(blank=True, max_length=5)),
                ('cgpa', models.FloatField()),
                ('passed', models.BooleanField(default=True)),
                ('back_log', models.ManyToManyField(to='student.BacklogSubject')),
                ('batch', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='student.batch')),
                ('roll', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='student.student')),
                ('sem', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='student.semester')),
                ('subj', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='student.subjects')),
            ],
            options={
                'verbose_name_plural': 'AttemptBacklog',
            },
        ),
    ]
