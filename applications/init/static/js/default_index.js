var enumerate = function(arr) {
    var k=0; return arr.map(function(e) {
        e._idx = k++;
        Vue.set(e, 'editing', false);
        Vue.set(e,'showPostStatus', false);
    });
};

var processPosts = function() {
    enumerate(app.posts);
    console.log(app.posts);
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
        post_content: app.newPostContent,
        category: app.newCategory
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
        post_content: app.posts[idx].post_content,
    };
    $.post(editPostUrl, newPost, function(response) {
        onPageLoad();
    });
};

var onPageLoad = function() {
    $.getJSON(getPostsUrl,
        function(response) {
            app.posts = response.posts;
            processPosts();
        }
    );
};

var showPost = function(idx) {
    var id = app.posts[idx].id;
    var url = showPostUrl + '?id=' + id;
    app.posts[idx].showPostStatus = true;

    $.post(url, function(response) {
        app.posts[idx].posts = response.posts;
    })
};

var hidePost = function(idx) {
    app.posts[idx].showPostStatus = false;
};


var app = new Vue({
    el: '#app',
    delimiters: ['${','}'],
    unsafeDelimiters: ['!{','}'],
    data: {
        newPostTitle: "",
        newPostContent: "",
        newCategory: "",
        posts: [],
        search: '',
        showPostStatus: false
    },
    methods: {
        submitPost: insertPost,
        editPost: editPost,
        savePost: savePost,
        showPost: showPost,
        hidePost: hidePost,
        
    },
    computed: {
        filteredPosts: function() {
            return this.posts.filter((post) => {
                return post.title.match(this.search);
            })
        },
        filteredCategory: function() {
            return this.posts.filter((post) => {
                return post.category.match(this.search);
            })
        }
    }
});

onPageLoad();

