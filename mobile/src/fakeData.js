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
    title: 'Inception',
    content: 'Mind-blowing narrative and effects. A must-watch!',
    rating: '★★★★☆',
    comment:50,
    like:100
  },
  {
    id: 2,
    user: 'janedoe',
    title: 'Parasite',
    content:
      'A brilliant social satire that will keep you on the edge of your seat.',
    rating: '★★★★★',
    comment:50,
    like:100
  },
  {
    id: 3,
    user: 'smith',
    title: 'Interstellar',
    content: 'A visually stunning masterpiece with deep emotional resonance.',
    rating: '★★★★☆',
    comment:50,
    like:100
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
