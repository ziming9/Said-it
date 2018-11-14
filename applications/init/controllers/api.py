def insert_post():
    new_post_id = db.posts.insert(
        title=request.vars.title,
        post_content=request.vars.post_content
    )
    return response.json(dict(new_post_id=new_post_id))

def get_all_posts():
    posts = db(db.posts).select()   #get all posts entries in post table

    post_list = []

    for post in posts:
        post_to_send = dict(
            id=post.id,
            title=post.title,
            post_content=post.post_content
        )
        
        post_list.append(post_to_send)

    return response.json(dict(posts=post_list))

def edit_posts():
    db.posts.update_or_insert(db.posts.id == request.vars.id,
        title=request.vars.title,
        post_content=request.vars.post_content
    )
    return "post edited!"
