import datetime

def get_user_name():
    return None if auth.user is None else auth.user.first_name

def get_user_email():
    return None if auth.user is None else auth.user.email

def get_current_time():
    return datetime.datetime.utcnow()

db.define_table('posts',
                Field('user_name', 'string'),
                Field('author', default=get_user_email()),
                Field('title'),
                Field('post_content', 'text'),  
                Field('category'),             
                )

#db.define_table('image',
#               Field('title'),
#               Field('fileName ','upload'),
#               format = '%(title)s')
                
db.define_table('image', Field('fileName', 'upload', 
required=True, notnull=True, requires = IS_NOT_EMPTY()))
