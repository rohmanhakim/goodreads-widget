function component() {
  const apiKey = process.env.GOODREADS_API_KEY;
  const userId = process.env.GOODREADS_USER_ID;
  const goodreadsUrl = "https://www.goodreads.com/";
  const shelf = "read";
  const goodreadsEndpoint = `review/list/${userId}.xml?key=${apiKey}&v=2&shelf=${shelf}`;
  const corsAnywhereUrl = "https://cors-anywhere.herokuapp.com/" 
  const url = corsAnywhereUrl + goodreadsUrl + goodreadsEndpoint;

  const element = document.createElement('div');
  
  fetch(url + "&page=" + "1")
  .then((response) => {
    return response.text();
  })
  .then((xmlResponse) => {
    var domParser = new DOMParser();
    var xmlDocument = domParser.parseFromString(xmlResponse, "text/xml");
    var reviews = xmlDocument.getElementsByTagName('review')
    var titles = Array.from(reviews).map( review => { 
      return "<li><a href=\"" +  
        review.getElementsByTagName('book')[0].getElementsByTagName('link')[0].innerHTML + "\">" +
        review.getElementsByTagName('book')[0].getElementsByTagName('title')[0].innerHTML +
      "</a></li>";
    }).join("");
    console.log(titles);
    element.innerHTML  = "<ul class=\"book-snippet\" id=\"book-snippet\">" + titles + "</ul>";
    document.body.appendChild(element);
  });
}

component();

