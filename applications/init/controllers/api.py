def get_user_name(email):
    u = db(db.auth_user.email == email).select().first()
    if u is None:
        return 'None'
    else:
        return ' '.join([u.first_name, u.last_name])

@auth.requires_signature()
def insert_post():
    new_post_id = db.posts.insert(
        user_name=get_user_name(request.vars.email),
        title=request.vars.title,
        post_content=request.vars.post_content,
        category=request.vars.category
    )
    return response.json(dict(new_post_id=new_post_id))

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
            category=post.category
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
