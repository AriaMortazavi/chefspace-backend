let posting = [
  {
    id: 1,
    postImg: "url(https://assets1.ignimgs.com/2019/05/31/mario-64---button-1559263987447.jpg)",
    postText: "This is my recipe",
    postLike: 6,
    postDislike: 1,
  },
]
let user = [
  {
    id: 1,
    username: "AriaMor",
    email: "ariamor7@gmail.com",
    skill: "Beginner",
    userImg: "url(https://thumbor.thedailymeal.com/O4ofgyXw4SHr5PeljGXaIoRVvOw=/870x565/https://www.thedailymeal.com/sites/default/files/slides/2-michael%20mina-Yelp.jpg)",
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