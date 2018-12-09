import random

def get_user_name(email):
    u = db(db.auth_user.email == email).select().first()
    if u is None:
        return 'Anonymous #{}'.format(random.randint(1,999))
    else:
        return ' '.join([u.first_name, u.last_name])


@auth.requires_signature()
def insert_post():
    post_id = db.posts.insert(
        user_name=get_user_name(request.vars.email),
        title=request.vars.title,
        post_content=request.vars.post_content,
        category=request.vars.category
    )
    return response.json(dict(post_id=post_id))


@auth.requires_signature()
def delete_post():
    db(db.posts.id == request.vars.id).delete()
    return 'post deleted'


def get_all_posts():
    posts = db(db.posts).select()   #get all posts entries in post table

    post_list = []

    for post in posts:
        post_to_send = dict(
            id=post.id,
            author=post.author,
            user_name=get_user_name(post.author),
            title=post.title,
            post_content=post.post_content,
            category=post.category,
            post_time=post.post_time
        )
        
        post_list.append(post_to_send)  

    return response.json(dict(posts=post_list))


@auth.requires_signature()
def edit_posts():

    db.posts.update_or_insert(db.posts.id == request.vars.id,
        title=request.vars.title,
        post_content=request.vars.post_content
    )
    return "post edited!"


def show_posts():
    posts = db(db.posts.id == request.vars.id).select()
    return response.json(dict(posts=posts))


@auth.requires_signature()
def get_image():
    blog_post_id = int(request.vars.blog_post_id)
    r = db(db.my_images.blog_post_id == blog_post_id).select().first()
    image_str = None
    if r is not None:
        image_str = r.image_str
    return response.json(dict(image_str = image_str))

    
def post_image():
    image_str = request.vars.image_url
    blog_post_id = int(request.vars.blog_post_id)
    # Normally, here I would have to check that the user can store the
    # image to the blog post, etc etc.
    db.my_images.update_or_insert(
        (db.my_images.blog_post_id == blog_post_id),
        blog_post_id = blog_post_id,
        image_str = image_str
    )
    return "ok"


def get_comment():
    post_id=int(request.vars.post_id)
    data = db(db.comments.post_id==post_id).select(db.comments.ALL, orderby=~db.comments.comment_time)
    print data
    return response.json(dict(comment_list=data))

def add_comment():
    post_id = int(request.vars.post_id)
    logged_in = auth.user_id is not None
    if logged_in:
        email = auth.user.email
    else:
        email = request.vars.email
    db.comments.insert(
        user_name=get_user_name(email),
        comment_content=request.vars.comment_content,
        post_id=post_id,
        author=email
    )
    return "ok"

@auth.requires_signature()
def edit_comment():
    comment_id = int(request.vars.id)
    comment_content = request.vars.comment_content
    db(db.comments.id==comment_id).update(
        comment_content=comment_content
    )
    return "ok"

@auth.requires_signature()
def delete_comment():
    db(db.comments.id == request.vars.id).delete()
    return 'comment deleted'
