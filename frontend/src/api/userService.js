const SERVER_URL = "http://localhost:4000";

const addUser = function (userData) {
  console.log(userData)
  return fetch(SERVER_URL+"/api/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({userData: userData}),  // Ensure userData is not wrapped in another object
  })
  .then((res) => {
    if (!res.ok) {
      throw new Error('Network response was not ok ' + res.statusText);
    }
    return res.json();
  })
  .catch((error) => {
    console.error('There was a problem with the fetch operation:', error);
  });
};

// // delete an image from the gallery given its imageId
// const deleteImage = function (imageId) {
//   return fetch(`/api/images/${imageId}`, {
//     method: "DELETE",
//   }).then((res) => res.json());
// };

// const getImages = function (page, limit) {
//   return fetch(`/api/images?page=${page}&limit=${limit}`).then((res) =>
//     res.json()
//   );
// };

// // add a comment to an image
// const addComment = function (imageId, author, content) {
//   return fetch(`/api/images/${imageId}/comments`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ author: author, content: content }),
//   }).then((res) => res.json());
// };

// // delete a comment to an image
// const deleteComment = function (imageId, commentId) {
//   return fetch(`/api/images/${imageId}/comments/${commentId}`, {
//     method: "DELETE",
//   }).then((res) => res.json());
// };

// const getComments = function (
//   imageId,
//   nextComment,
//   prevComment,
//   nextPage,
//   commentPage
// ) {
//   return fetch(
//     `/api/images/${imageId}/comments?nextC=${nextComment}&prevC=${prevComment}&nextPage=${nextPage}&commentPage=${commentPage}`
//   ).then((res) => res.json());
// };

export {
  addUser,
  // deleteImage,
  // getImages,
  // addComment,
  // deleteComment,
  // getComments,
};
