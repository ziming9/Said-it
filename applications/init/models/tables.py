import datetime

def get_user_name():
    return None if auth.user is None else auth.user.first_name

def get_current_time():
    return datetime.datetime.utcnow()

db.define_table('post',
                Field('username', default=get_user_name),
                Field('title'),
                Field('post_content', 'text'),
                Field('post_time', 'datetime', update=get_current_time()),
                )

db.post.post_time.readable = db.post.post_time.writable = False
db.post.username.writable = False