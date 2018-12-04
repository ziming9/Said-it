# -*- coding: utf-8 -*-
# -------------------------------------------------------------------------
# This is a sample controller
# this file is released under public domain and you can use without limitations
# -------------------------------------------------------------------------

import os

# ---- example index page ----
def index():
    return dict(message=T('Welcome to said-it!'))


def sports():
    return dict(message=T('Sports'))

def news():
    return dict(message=T('News'))

def arts():
    return dict(message=T('Arts'))

def entertainment():
    return dict(message=T('Entertainment'))

def history():
    return dict(message=T('History'))

def politics():
    return dict(message=T('Politics'))

def blog():
    return dict(message=T('Blogs'))

def education():
    return dict(message=T('Education'))

def religion():
    return dict(message=T('Religion'))

def technology():
    return dict(message=T('Technology'))






@auth.requires_login()
def add_reply():
    """COMPLETE (and remove line below or replace as appropriate)"""
    # You will be creating a form, in some way, e.g. using SQLFORM, and you will write
    # BEFORE processing the form:
    # 
    form = SQLFORM(db.reply)
    form.vars.post_id = int(request.args[0])
    if form.process().accepted:
        
        redirect(URL('default', 'index'))
  # We ask web2py to lay out the form for us.
    logger.info("My session is: %r" % session)
    return dict(form=form)
    




@auth.requires_login()
@auth.requires_signature()
def edit_reply():
    """COMPLETE (and remove line below or replace as appropriate)"""
    reply = db.reply(request.args(0))
    # We must validate everything we receive.
    if reply is None:
        logging.info("Invalid edit call")
        redirect(URL('default', 'index'))
    # One can edit only one's own posts.
    if reply.reply_author != auth.user.email:
        logging.info("Attempt to edit some one else's post by: %r" % auth.user.email)
        redirect(URL('default', 'index'))
    # Now we must generate a form that allows editing the post.
    form = SQLFORM(db.reply, record=reply)
    if form.process().accepted:
        # The deed is done.
        redirect(URL('default', 'index'))
    return dict(form=form)
    return redirect(URL('default', 'index'))
    


@auth.requires_login()
@auth.requires_signature()
def delete_reply():
    """COMPLETE (and remove line below or replace as appropriate)"""
    reply = db.reply(request.args(0))
    if reply.reply_author != auth.user.email:
        loging.info("Attempt to delete someone else's post by: %r" % auth.user.email)
        redirect(URL('default', 'index'))
    db(db.reply.id == reply.id).delete()
    return redirect(URL('default', 'index'))




# We require login.
@auth.requires_login()
def edit():
    """Allows editing of a post.  URL form: /default/edit/<n> where n is the post id."""

    # For this controller only, we hide the author.
    db.post.post_author.readable = False

    post = db.post(request.args(0))
    # We must validate everything we receive.
    if post is None:
        logging.info("Invalid edit call")
        redirect(URL('default', 'index'))
    # One can edit only one's own posts.
    if post.post_author != auth.user.email:
        logging.info("Attempt to edit some one else's post by: %r" % auth.user.email)
        redirect(URL('default', 'index'))
    # Now we must generate a form that allows editing the post.
    form = SQLFORM(db.post, record=post)
    if form.process().accepted:
        # The deed is done.
        redirect(URL('default', 'index'))
    return dict(form=form)


    
# ---- Action for login/register/etc (required for auth) -----
def user():
    """
    exposes:
    http://..../[app]/default/user/login
    http://..../[app]/default/user/logout
    http://..../[app]/default/user/register
    http://..../[app]/default/user/profile
    http://..../[app]/default/user/retrieve_password
    http://..../[app]/default/user/change_password
    http://..../[app]/default/user/bulk_register
    use @auth.requires_login()
        @auth.requires_membership('group name')
        @auth.requires_permission('read','table name',record_id)
    to decorate functions that need access control
    also notice there is http://..../[app]/appadmin/manage/auth to allow administrator to manage users
    """
    return dict(form=auth())

# ---- action to server uploaded static content (required) ---
@cache.action()
def download():
    """
    allows downloading of uploaded files
    http://..../[app]/default/download/[filename]
    """
    return response.download(request, db)

def link(): 
    return response.download(request,db,attachment=False)

def serve_file():
    filename = request.args(0)
    path = os.path.join(request.folder, 'private', 'file_subfolder', filename)
    return response.stream(path)

def myform():
    form = SQLFORM(db.image)
    if form.accepts(request, session):
        session.flash = "successfull upload"
        redirect(URL(c='default', f='index'))
    return dict(form=form)






