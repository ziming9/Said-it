
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

var deletePost = function(idx) {
    $.post(deleteUrl, 
        { id: app.posts[idx].id }, 
        function() {
            app.posts.splice(idx,1);
            if(app.posts.length <= 99)
                app.processPosts();
            enumerate(app.posts);
        })
}

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
        searchSports: 'Sports',
        searchNews: 'News',
        searchArts: 'Arts',
        searchEnt: 'Entertainment',
        searchHist: 'History',
        searchPoltc: 'Politics',
        searchBlog: 'Blog',
        searchEdu: 'Education',
        searchReli: 'Religion',
        searchTech: 'Technology',
        showPostStatus: false,
        useremail: useremail
    },
    methods: {
        submitPost: insertPost,
        editPost: editPost,
        savePost: savePost,
        showPost: showPost,
        hidePost: hidePost,
        deletePost: deletePost
        
    },
    computed: {
        filteredPosts: function() {
            return this.posts.filter((post) => {
                return post.title.toLowerCase().match(this.search.toLowerCase()) || post.category.match(this.search);
            })
        },
        sportPosts: function() {
            return this.posts.filter((post) => {
                return post.category.match(this.searchSports);
            })
        },
        newsPosts: function() {
            return this.posts.filter((post) => {
                return post.category.match(this.searchNews);
            })
        },
        artsPosts: function() {
            return this.posts.filter((post) => {
                return post.category.match(this.searchArts);
            })
        },
        entPosts: function() {
            return this.posts.filter((post) => {
                return post.category.match(this.searchEnt);
            })
        },
        histPosts: function() {
            return this.posts.filter((post) => {
                return post.category.match(this.searchHist);
            })
        },
        poltcPosts: function() {
            return this.posts.filter((post) => {
                return post.category.match(this.searchPoltc);
            })
        },
        blogPosts: function() {
            return this.posts.filter((post) => {
                return post.category.match(this.searchBlog);
            })
        },
        eduPosts: function() {
            return this.posts.filter((post) => {
                return post.category.match(this.searchEdu);
            })
        },
        reliPosts: function() {
            return this.posts.filter((post) => {
                return post.category.match(this.searchReli);
            })
        },
        techPosts: function() {
            return this.posts.filter((post) => {
                return post.category.match(this.searchTech);
            })
        },
      
    }
});

onPageLoad();

