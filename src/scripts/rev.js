const reviews = [
  {
    text: "This is a great product! Highly recommend it.",
    author: "– Alex M.",
  },
  {
    text: "Customer service was excellent and the quality exceeded my expectations.",
    author: "– Jamie R.",
  },
  {
    text: "I've tried several, but this is by far the best one.",
    author: "– Sam T.",
  },
];

let currentIndex = 0;

function updateReview() {
  document.getElementById(
    "review-text"
  ).innerText = `"${reviews[currentIndex].text}"`;
  document.getElementById("review-author").innerText =
    reviews[currentIndex].author;
}

function nextReview() {
  currentIndex = (currentIndex + 1) % reviews.length;
  updateReview();
}

function prevReview() {
  currentIndex = (currentIndex - 1 + reviews.length) % reviews.length;
  updateReview();
}
