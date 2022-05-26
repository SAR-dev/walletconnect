- The very step is to check if there's any existing env folder, if its there delete it first. It has to be your system based

- To Create the virtualenv -> virtualenv env

- To Activate the virtualenv -> source env/bin/activate [MAC] env\Scripts\activate [Windows]

- To Install the requirements -> pip install -r requirements.txt

- Makemigrations -> django mm OR python manage.py makemigrations

- Migrate -> django m OR python manage.py migrate

- To run the server -> django r OR python manage.py runserver

- Notes about the template (html) structure ↓

There is a base.html present, the purpose of creating a base.html is avoid writing the same fixed components which will be use throughout the website for exmaple - navbar, footer, sidebar etc.

- To access the admin panel

Open - http://localhost:8000/admin/

Sqlite Database I connected already, created a superuser

username: admin
password: 2121
