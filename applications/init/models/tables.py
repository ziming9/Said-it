import datetime

def get_user_name():
    return None if auth.user is None else auth.user.first_name

def get_user_email():
    return None if auth.user is None else auth.user.email

def get_current_time():
    return datetime.datetime.utcnow()

db.define_table('posts',
                Field('user_name', 'string'),
                Field('author', default=auth.user.email if auth.user_id else None),
                Field('title'),
                Field('post_content', 'text'),  
                Field('category'),     
                Field('image', 'upload'),        
                )

db.define_table('comments',
                Field('author', default=auth.user.email if auth.user_id else None),
                Field('user_name', 'string'),
                Field('comment_content'),
                )

#db.define_table('image',
#               Field('title'),
#               Field('fileName ','upload'),
#               format = '%(title)s')

db.define_table('my_images',
    Field('image_str', 'text'),
    Field('blog_post_id', 'integer'), # Should be a reference to a blog post I guess. 
)
                
db.define_table('image', Field('fileName', 'upload', 
required=True, notnull=True, requires = IS_NOT_EMPTY()))
