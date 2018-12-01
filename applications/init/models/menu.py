# -*- coding: utf-8 -*-
# this file is released under public domain and you can use without limitations

# ----------------------------------------------------------------------------------------------------------------------
# this is the main application menu add/remove items as required
# ----------------------------------------------------------------------------------------------------------------------

response.menu = [
    (T('Home'), False, URL('default', 'index'), [])
]

# ----------------------------------------------------------------------------------------------------------------------
# provide shortcuts for development. you can remove everything below in production
# ----------------------------------------------------------------------------------------------------------------------

if not configuration.get('app.production'):
    _app = request.application
    response.menu += [
        (T('Categories'), False, '#', [
            (T('Sports'), False, URL(_app, 'default', 'sports')),
            (T('News'), False, URL(_app, 'default', 'news')),
            (T('Arts'), False, URL(_app, 'default', 'arts')),
            (T('Entertainment'), False, URL(_app, 'default', 'entertainment')),
            (T('History'), False, URL(_app, 'default', 'history')),
            (T('Politics'), False, URL(_app, 'default', 'politics')),
            (T('Blog'), False, URL(_app, 'default', 'blog')),
            (T('Education'), False, URL(_app, 'default', 'education')),
            (T('Religion'), False, URL(_app, 'default', 'religion')),
            (T('Technology'), False, URL(_app, 'default', 'technology')),
        ]),
    ]

