const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
var app = express();
var photoPosts = JSON.parse(fs.readFileSync('./server/data/posts.json'));
app.use(express.static('public'));
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

function getPhotoPost(id) {
    return photoPosts.find(function (element) {
        return element.id == id;
    });
}

function addPhotoPost(post) {
    if (validatePhotoPost(post)) {
        photoPosts.push(post);
        fs.writeFile(('./server/data/posts.json'), JSON.stringify(photoPosts));
        return true;
    }
    return false;
}

function validatePhotoPost(post) {
    for (var i in post.hashtags) {
        if (typeof post.hashtags[i] !== 'string') {
            return false;
        }
    }
    if ((!post.hasOwnProperty('id')) || typeof post.id !== 'string' || photoPosts.findIndex(function (element) {
        return element.id == post.id;
    }) >= 0) {
        return false;
    }
    if ((!post.hasOwnProperty('photoLink')) || typeof post.photoLink !== 'string' || post.photoLink.lenght == 0) {
        return false;
    }
    if ((!post.hasOwnProperty('author')) || typeof post.author !== 'string' || post.author.lenght == 0) {
        return false;
    }
    if (!post.hasOwnProperty('createdAt') || !post.createdAt instanceof Date) {
        return false;
    }
    if ((!post.hasOwnProperty('description')) || typeof post.description !== 'string' || post.description.lenght == 0 || post.description.lenght >= 200) {
        return false;
    }
    return true;
}


function removePhotoPost(id) {
    var index = photoPosts.findIndex(function (element) {
        return element.id == id;
    });
    if (index >= 0) {
        photoPosts.splice(index, 1);
        fs.writeFile(('./server/data/posts.json'), JSON.stringify(photoPosts));
        return true;
    }
    return false;
}


function compareDates(a, b) {
    return new Date(b.createdAt) - new Date(a.createdAt);
}
function getPhotoPosts(skip, top, filterConfig) {
    skip = skip || 0;
    top = top || 10;
    if (filterConfig === undefined) {
        return photoPosts.sort(compareDate).slice(skip, skip + top);
    } else {
        if (filterConfig.author !== undefined) {
            photoPosts = photoPosts.filter((element) => element.author === filterConfig.author);
        }
        if (filterConfig.hashTag !== undefined) {
            photoPosts = photoPosts.filter((element) => element.hashTag === filterConfig.hashTag);
        }
        return photoPosts.sort(compareDate).slice(skip, skip + top);
    }
}

function editPhotoPost(id, post) {
    if (!post || typeof id !== 'string' || id.length == 0) {
        return false;
    }
    var edit = false;
    var index = photoPosts.findIndex(function (element) {
        return element.id == id;
    });
    if (index >= 0) {
        if (post.hasOwnProperty('id') || post.hasOwnProperty('createdAt') || post.hasOwnProperty('author')) {
            return false;
        }
        if (post.hasOwnProperty('description')) {
            photoPosts[index].description = post.description;
            edit = true;
        }
        if (post.hasOwnProperty('hashtags')) {
            photoPosts[index].hashtags = post.hashtags;
            edit = true;
        }
        if (post.hasOwnProperty('photoLink')) {
            photoPosts[index].photoLink = post.photoLink;
            edit = true;
        }
        if (edit) {
            fs.writeFile(('./server/data/posts.json'), JSON.stringify(photoPosts));
            return true;
        }
    }
    return false;
}


app.get('/allPosts', (request, response) => {
    photoPosts ? response.send(photoPosts) : response.status(404).end();
});


app.get('/getPost', (request, response) => {
    var post = getPhotoPost(request.query.id);
    if (post) {
        response.send(post);
    } else {
        response.status(404).end();
    }
});

app.post('/addPost', (request, response) => {
    if (photoPosts) {
        addPhotoPost(request.body);
        response.send(photoPosts);
    } else {
        response.status(404).end();
    }
});

app.post('/getPosts', (request, response) => {
    if (photoPosts) {
        response.send(getPhotoPosts(request.query.skip, request.query.top, request.body));
    } else {
        response.status(404).end();
    }
});

app.put('/editPost', (request, response) => {
    var post = request.body;
    if (post) {
        editPhotoPost(request.query.id, post);
        response.send(photoPosts);
    } else {
        response.status(404).end();
    }
});

app.delete('/removePost', (request, response) => {
    if (photoPosts) {
        removePhotoPost(request.query.id);
        response.send(photoPosts);
    } else {
        response.status(404).end();
    }
});

app.listen(3000, () => {
    console.log('Server is running...');
});