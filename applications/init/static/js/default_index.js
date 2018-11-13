var enumerate = function(arr) {
    var k=0; return arr.map(function(e) {
        e._idx = k++;
        Vue.set(e, 'editing', false);
    });
};

var processPosts = function() {
    enumerate(app.posts);
};

var onPageLoad = function() {
    $.getJSON(getPostsUrl,
        function(response) {
            app.posts = response.posts;
            processPosts();
        }
    );
};

var insertPost = function() {
    var newPost = {
        title: app.newPostTitle,
        post_content: app.newPostContent
    };
    $.post(insertPostUrl, newPost, function(response) { 
        newPost['id'] = response.new_post_id;
        app.posts.push(newPost);
        processPosts();
    });
};

var editPost = function(idx) {
    app.posts[idx].editing = true;
};

var savePost = function(idx) {
    app.posts[idx].editing = false;
    // make request to server here to save changes in database
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
        submitPost: insertPost,
        editPost: editPost,
        savePost: savePost
    }
});

onPageLoad();

