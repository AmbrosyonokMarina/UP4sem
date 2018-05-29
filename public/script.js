var photoPosts = [
  {
    id: '1',
    descriprion: 'Rob ♥',
    createdAt: new Date('2018-03-06T23:00:00'),
    author: '9NorthernLigts',
    photoLink: 'https://pp.userapi.com/c834101/v834101607/dcba6/7n8MVuV2bEI.jpg'
  },
  {
      id: '2',
      descriprion: 'Прекрасные выходные...♥',
      createdAt: new Date('2018-05-03T23:00:00'),
      author: '9NorthernLigts',
      photoLink: 'https://pp.userapi.com/c7004/v7004974/4ab92/XwmEHM5NDGI.jpg'
  },
  {
      id: '3',
      descriprion: 'Прекрасные выходные...♥',
      createdAt: new Date('2018-04-03T23:00:00'),
      author: 'JuliaMur13',
      photoLink: 'https://pp.userapi.com/c635103/v635103048/37373/_JYeXg5Gb1A.jpg'
  },
  {
        id: '4',
        descriprion: 'Прекрасный вечер',
        createdAt: new Date('2018-04-03T23:00:00'),
        author: 'masha17',
        photoLink: 'https://pp.userapi.com/c841539/v841539281/16249/0HjF_vnMMr0.jpg'
  },
  {
          id: '5',
          descriprion: 'Прекрасный вечерочек',
          createdAt: new Date('2018-04-07T23:00:00'),
          author: 'masha17',
          photoLink: 'https://pp.userapi.com/c840433/v840433840/dda7/4v6oYk0wLQI.jpg'
    },
  {
        id: '6',
        descriprion: '♥',
        createdAt: new Date('2018-05-08T23:00:00'),
        author: '9NorthernLigts',
        photoLink: 'https://pp.userapi.com/c836227/v836227094/2c211/Hcp7t5f1QxQ.jpg'
  },
  {
        id: '7',
        descriprion: 'Скоро 8 марта',
        createdAt: new Date('2018-04-07T23:00:00'),
        author: 'masha17',
        photoLink: 'https://pp.userapi.com/c635103/v635103094/200f0/l_WRibuqG4o.jpg'
  },
  {
        id: '8',
        descriprion: '',
        createdAt: new Date('2018-03-10T23:00:00'),
        author: 'masha17',
        photoLink: 'https://pp.userapi.com/c7004/v7004610/4b2d9/eBptrOxb2lY.jpg'
  },
  {
        id: '9',
        descriprion: '♥',
        createdAt: new Date('2018-03-15T23:00:00'),
        author: '9NorthernLigts',
        photoLink: 'https://pp.userapi.com/c840237/v840237816/81a3a/ZfrfzFmddYo.jpg'
  },
{
        id: '10',
        descriprion: 'Лето, ты где??',
        createdAt: new Date('2018-03-24T23:00:00'),
        author: 'JuliaMur13',
        photoLink: 'https://pp.userapi.com/c7004/v7004235/4b980/J6rzupvK0VI.jpg'
  }
];
var module = (function () {
        function compareDate(a, b) {
            return (a.createdAt) - (b.createdAt);
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

        function getPhotoPost(id) {
            return photoPosts.find((element) => element.id === id);
        }

        function validatePhotoPost(photoPost) {
            if (typeof(photoPost.id) !== "string" || typeof(photoPost.author) !== "string" || typeof(photoPost.description) !== "string"
                || typeof(photoPost.photoLink) !== "string") {
                return false;
            }
            if (photoPost.id.trim() === "" || photoPost.author.trim() === "" || photoPost.description.trim() === "" || photoPost.photoLink.trim() === ""
                || photoPost.hashTag.length === 0 || photoPost.like.length === 0) {
                return false;
            }
            for (var index = 0; index < photoPost.hashTag.length; index++) {
                if (typeof(photoPost.hashTag[index]) !== "string" || photoPost.hashTag[index].trim() === "") {
                    return false;
                }
            }

            for (var index = 0; index < photoPost.like.length; index++) {
                if (typeof(photoPost.like[index]) !== "string" || photoPost.like[index].trim() === "") {
                    return false;
                }
            }

            if (!photoPost.createdAt instanceof Date) {
                return false;
            }
            return true;
        }

        function removePhotoPost(id) {
            var index = photoPosts.findIndex((element) => element.id === id);
            if (index) {
                photoPosts = photoPosts.splice(index, 1);
                console.log(photoPosts);
                return true;
            } else {
                return false;
            }
        }

        function addPhotoPost(objectPhotoPost) {
//            if (validatePhotoPost(objectPhotoPost)) {
                photoPosts.push(objectPhotoPost);
                console.log(photoPosts);
                return true;
//            }
//            return false;
        }

        function editPhotoPost(id, objectPhotoPost) {
            if (!objectPhotoPost) {
                return false;
            }
            if (id === undefined || typeof id !== 'string') {
                return false;
            }
            var index = photoPosts.findIndex((element) => element.id === id);

            var post = photoPosts[index];
                    if (post) {
                        Object.assign(post, objectPhotoPost);
                    }
            console.log(post);
            return true;

        }

        return {
            getPhotoPosts: getPhotoPosts,
            removePhotoPost: removePhotoPost,
            editPhotoPost: editPhotoPost,
            addPhotoPost: addPhotoPost,
            getPhotoPost: getPhotoPost
        }
    }
)
();
console.log(module.getPhotoPosts(0, 10));
console.log(module.getPhotoPosts(0, 10, {author: "9NorthernLigts"}));
console.log(module.getPhotoPost('9'));
console.log(module.editPhotoPost('1', {descriprion:"hjfhj"}));
console.log(module.addPhotoPost({
    id: '11',
    description: 'Цветы',
    createdAt: new Date('2018-4-27T21:00:00'),
    author: '9NorthernLigts',
    photoLink: 'https://pp.userapi.com/c635103/v635103053/38cb9/ovciNgTdXqc.jpg'
}));
console.log(module.removePhotoPost('11'));