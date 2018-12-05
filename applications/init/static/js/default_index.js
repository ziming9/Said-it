
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

var uploadFile = function (event, post_idx) {
    // This function is in charge of:
    // - Creating an image preview
    // - Uploading the image to GCS
    // - Calling another function to notify the server of the final image URL.

    var blog_post_id = post_idx; // TODO: you really have here to do something like:
     //post = app.posts[post_idx];
     //var blog_post_id = post.id;

    // Reads the file.
    var input = event.target;
    var file = input.files[0];
    if (file) {
        // We want to read the image file, and transform it into a data URL.
        var reader = new FileReader();
        // We add a listener for the load event of the file reader.
        // The listener is called when loading terminates.
        // Once loading (the reader.readAsDataURL) terminates, we have
        // the data URL available.
        reader.addEventListener("load", function () {
            // An image can be represented as a data URL.
            // See https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs
            // Here, we set the data URL of the image contained in the file to an image in the
            // HTML, causing the display of the file image.
            app.img_url = reader.result;
            $.post(image_post_url, {
                image_url: reader.result,
                blog_post_id: blog_post_id // Placeholder for more useful info.
            });
        }, false);
        // Reads the file as a data URL. This triggers above event handler.
        reader.readAsDataURL(file);
    }
};

var getImage = function () {
    $.getJSON(image_get_url,
        {
            blog_post_id: 1,
        },
        function (data) {
            app.received_image = data.image_str;
        }
        )
};

var app = new Vue({
    el: '#app',
    delimiters: ['${','}'],
    unsafeDelimiters: ['!{','}'],
    data: {
        img_url: null,
        received_image: null,
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
        deletePost: deletePost,
        uploadFile: uploadFile,
        getImage: getImage,
        
    },
    computed: {
        filteredPosts: function() {
            return this.posts.filter((post) => {
                return post.title.toLowerCase().match(this.search.toLowerCase()) || post.category.toLowerCase().match(this.search.toLowerCase());
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

