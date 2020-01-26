function component() {
  const apiKey = process.env.GOODREADS_API_KEY;
  const userId = process.env.GOODREADS_USER_ID;
  const goodreadsUrl = "https://www.goodreads.com/";
  const shelf = "read";
  const goodreadsEndpoint = `review/list/${userId}.xml?key=${apiKey}&v=2&shelf=${shelf}`;
  const corsAnywhereUrl = "https://cors-anywhere.herokuapp.com/"
  const url = corsAnywhereUrl + goodreadsUrl + goodreadsEndpoint;

  const element = document.createElement('div');

  var nextPage = 1;
  var bookElement  = ""

  var fetchBooks = function () {
    fetch(url + "&page=" + nextPage)
    .then((response) => {
      return response.text();
    })
    .then((xmlResponse) => {
      var domParser = new DOMParser();
      var xmlDocument = domParser.parseFromString(xmlResponse, "text/xml");

      var total = xmlDocument.getElementsByTagName('reviews')[0].getAttribute('total');
      var end = xmlDocument.getElementsByTagName('reviews')[0].getAttribute('end');

      var reviews = xmlDocument.getElementsByTagName('review')
      var mapped = Array.from(reviews).map(review => {
        return "<li><a href=\"" +
          review.getElementsByTagName('book')[0].getElementsByTagName('link')[0].innerHTML + "\">" +
          review.getElementsByTagName('book')[0].getElementsByTagName('title')[0].innerHTML +
          "</a></li>";
      }).join("");
      bookElement += mapped;
      console.log(mapped);

      if (end < total) {
        nextPage  = nextPage + 1;
        element.innerHTML = "<ul class=\"book-snippet\" id=\"book-snippet\">" + bookElement + "</ul>";
        document.body.appendChild(element);
        fetchBooks();
      }
    });
  }

  fetchBooks();
}

component();

