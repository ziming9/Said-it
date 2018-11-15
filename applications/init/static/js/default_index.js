var enumerate = function(arr) {
    var k=0; return arr.map(function(e) {
        e._idx = k++;
        Vue.set(e, 'editing', false);
    });
};

var processPosts = function() {
    enumerate(app.posts);
    console.log(app.posts);
};

var onPageLoad = function() {
    $.getJSON(getPostsUrl,
        function(response) {
            app.posts = response.posts;
            processPosts();
        }
    );
};

var loadFile = function(event) {
    var image = document.getElementById('output');
    image.src = URL.createObjectURL(event.target.files[0]);
    $.post(getImageUrl, image, function(response) {
        onPageLoad();
    });
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
    var newPost = {
        id: app.posts[idx].id,
        title: app.posts[idx].title,
        post_content: app.posts[idx].post_content
    };
    $.post(editPostUrl, newPost, function(response) {
        onPageLoad();
    });
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

