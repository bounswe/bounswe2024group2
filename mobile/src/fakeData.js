export const mockFilms = [
  {
    id: 1,
    title: 'The Shawshank Redemption',
    poster: require('./img/shawshankPoster.jpg'),
    rating:3.8
  },
  {
    id: 2,
    title: 'The Godfather',
    poster: require('./img/godfatherPoster.jpg'),
    rating:4.9
  },
  {
    id: 3,
    title: 'The Dark Knight',
    poster: require('./img/darkNightPoster.jpg'),
    rating:4.8
  },
  // Add more mock film data...
];

export const mockPosts = [
  {
    id: 1,
    user: 'johndoe',
    title: 'Godfather',
    content: 'Mind-blowing narrative and effects. A must-watch!',
    rating: 5,
    comment:50,
    like:100,
    poster: require('./img/godfatherPoster.jpg'),
  },
  {
    id: 2,
    user: 'janedoe',
    title: 'The Dark Knight',
    content:
      'A brilliant social satire that will keep you on the edge of your seat.',
    rating: 4.5,
    comment:50,
    like:100,
    poster: require('./img/darkNightPoster.jpg'),
  },
  {
    id: 3,
    user: 'johndoe',
    title: 'The Shawshank Redemption',
    content: 'A visually stunning masterpiece with deep emotional resonance.',
    rating: 4.7,
    comment:50,
    like:100,
    poster: require('./img/shawshankPoster.jpg'),
  },
  // Add more mock post data...
];

export const mockUsers = [
    {
        username: 'johndoe',
        password: 'password123',
        name: 'John Doe',
        profilePhotoUrl: '/img/mockUserProfilePhoto.png',
    },
]
