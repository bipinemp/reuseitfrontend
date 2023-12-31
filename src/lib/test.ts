const inputObject = {
  id: 1,
  title: "Sample Title",
  body: "Sample Body",
  likes: 10,
};

// Destructuring assignment to exclude the "likes" property
const { likes, ...outputObject } = inputObject;

console.log(outputObject);
