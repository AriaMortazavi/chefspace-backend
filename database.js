let posting = [
  {
    id: 1,
    postImg: "url(https://assets1.ignimgs.com/2019/05/31/mario-64---button-1559263987447.jpg)",
    postText: "This is my recipe",
    postLike: 6,
    postDislike: 1,
  },
]
let users = [
  {
    id: 1,
    username: "AriaMor",
    email: "ariamor7@gmail.com",
    password: "",
    level: "Beginner",
  },
]

function allPosts() {
  return posting
}
exports.allPosts = allPosts

function createPost(recipe) {
  recipe.id = posting.length + 1
  posting.push(recipe)
  return recipe
}
exports.createPost = createPost




function allUsers() {
  return users
}
exports.allUsers = allUsers



