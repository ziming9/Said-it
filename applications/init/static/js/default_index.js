var enumerate = function(arr) {
    var k=0; return arr.map(function(e) {
        e._idx = k++;
    });
};

var processPosts = function() {
    enumerate(app.posts);
};

var onPageLoad = function() {
    $.getJSON(get_posts_url,
        function(response) {
            app.posts = response.posts;
            processPosts();
        }
    );
};

var insertPost = function() {
    var newPost = {
        title: app.newPostTitle,
        post_content: app.newPostContent,
    };
    //$.post(get_posts_url, newPost, function(response) { //this line gives error to adding the post
    //    newPost['id'] = response.new_post_id;
        app.posts.push(newPost);
        processPosts();
    //})
};


var app = new Vue({
    el: '#app',
    delimiters: ['${','}'],
    unsafeDelimiters: ['!{','}'],
    data: {
        newPostTitle: "",
        newPostContent: "",
        posts: [],
    },
    methods: {
        submitPost: insertPost
    }
});

onPageLoad();

