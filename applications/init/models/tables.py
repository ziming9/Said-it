import datetime

def get_user_name():
    return None if auth.user is None else auth.user.first_name

def get_current_time():
    return datetime.datetime.utcnow()

db.define_table('posts',
                Field('username', default=get_user_name()),
                Field('title'),
                Field('post_content', 'text'),
                )