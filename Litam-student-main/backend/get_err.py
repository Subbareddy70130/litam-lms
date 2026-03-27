import os
import django
import traceback

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

try:
    from django.core.management import call_command
    call_command('check')
except Exception as e:
    with open('tb.txt', 'w') as f:
        traceback.print_exc(file=f)
    print("Wrote traceback to tb.txt")
