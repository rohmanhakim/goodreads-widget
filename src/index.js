import './styles/app.css';

function initComponent() {
  const apiKey = process.env.GOODREADS_API_KEY;
  const userId = process.env.GOODREADS_USER_ID;
  const goodreadsUrl = "https://www.goodreads.com/";
  const shelf = "read";

  var perPage = 20;
  var nextPage = 1;
  
  var showLoading = function () {
    const loadingWrapper = document.createElement('ul');
    loadingWrapper.setAttribute("id", "loading-wrapper")
    loadingWrapper.setAttribute("class", "loading-wrapper")
    var i;
    for (i = 0; i < perPage; i++) {
      var x = Math.floor((Math.random() * 3) + 1);
      const shimmering = document.createElement('div');
      switch (x) {
        case 1:
          shimmering.setAttribute("class", "comment br animate w240");
          break;
        case 2:
          shimmering.setAttribute("class", "comment br animate w320");
          break;
        case 3:
          shimmering.setAttribute("class", "comment br animate w480");
          break;
      }
      const shimmeringElement = document.createElement('li');
      shimmeringElement.appendChild(shimmering);
      loadingWrapper.appendChild(shimmeringElement);
    }

    document.getElementById('bookshelf-widget').appendChild(loadingWrapper);

    const bookshelf = document.createElement('ul');
    bookshelf.setAttribute("id", "bookshelf");
    bookshelf.setAttribute("class", "bookshelf");

    document.getElementById('bookshelf-widget').insertBefore(bookshelf, document.getElementById('bookshelf-widget').firstChild);
  }

  var hideLoading = function () {
    document.getElementById('bookshelf-widget').removeChild(document.getElementById('loading-wrapper'));
  }

  var fetchBooks = function () {
    const goodreadsEndpoint = `review/list/${userId}.xml?key=${apiKey}&v=2&shelf=${shelf}&per_page=${perPage}`;
    const corsAnywhereUrl = "https://cors-anywhere.herokuapp.com/"
    const url = corsAnywhereUrl + goodreadsUrl + goodreadsEndpoint;

    fetch(url + "&page=" + nextPage)
      .then((response) => {
        return response.text();
      })
      .then((xmlResponse) => {
        var domParser = new DOMParser();
        var xmlDocument = domParser.parseFromString(xmlResponse, "text/xml");

        var total = parseInt(xmlDocument.getElementsByTagName('reviews')[0].getAttribute('total'));
        var start = parseInt(xmlDocument.getElementsByTagName('reviews')[0].getAttribute('start'));
        var end = parseInt(xmlDocument.getElementsByTagName('reviews')[0].getAttribute('end'));
        perPage = end - start + 1;

        var reviews = xmlDocument.getElementsByTagName('review')
        var mapped = Array.from(reviews).map(review => {
          return "<a href=\"" +
            review.getElementsByTagName('book')[0].getElementsByTagName('link')[0].innerHTML + "\">" +
            review.getElementsByTagName('book')[0].getElementsByTagName('title')[0].innerHTML +
            "</a>";
        });

        mapped.forEach(item => {
          const book = document.createElement('li');
          book.innerHTML = item;
          document.getElementById('bookshelf').appendChild(book);
        })
        nextPage = nextPage + 1;

        if (end < total) {
          fetchBooks();
        } else {
          hideLoading();
        }
      });
  }

  showLoading();
  fetchBooks();
}

initComponent();

