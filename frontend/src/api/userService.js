let userService = (function () {
  "use strict";

  const module = {};

  /*  ******* Data types *******
    image objects must have at least the following attributes:
        - (String) imageId 
        - (String) title
        - (String) author
        - (String) url
        - (Date) date

    comment objects must have the following attributes
        - (String) commentId
        - (String) imageId
        - (String) author
        - (String) content
        - (Date) date
  */
  let index = 0;

  module.addImage = function (formData) {
    return fetch("/api/images", {
      method: "POST",
      body: formData,
    }).then((res) => res.json());
  };

  // delete an image from the gallery given its imageId
  module.deleteImage = function (imageId) {
    return fetch(`/api/images/${imageId}`, {
      method: "DELETE",
    }).then((res) => res.json());
  };

  module.getCurrentImageIndex = function () {
    return index;
  };

  module.getImages = function (page, limit) {
    return fetch(`/api/images?page=${page}&limit=${limit}`).then((res) =>
      res.json(),
    );
  };

  // add a comment to an image
  module.addComment = function (imageId, author, content) {
    return fetch(`/api/images/${imageId}/comments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ author: author, content: content }),
    }).then((res) => res.json());
  };

  // delete a comment to an image
  module.deleteComment = function (imageId, commentId) {
    return fetch(`/api/images/${imageId}/comments/${commentId}`, {
      method: "DELETE",
    }).then((res) => res.json());
  };

  module.getComments = function (
    imageId,
    nextComment,
    prevComment,
    nextPage,
    commentPage,
  ) {
    return fetch(
      `/api/images/${imageId}/comments?nextC=${nextComment}&prevC=${prevComment}&nextPage=${nextPage}&commentPage=${commentPage}`,
    ).then((res) => res.json());
  };

  return module;
})();
