# Goodreads Widget
A simple HTML + JS widget that enables you to embed your Goodreads bookshelf into your  website/blog.
Using Javascript's Fetch & DOM API. No external dependencies, not even jquery.

## Prerequisites
1. NodeJS 12++
2. NPM 5.3++  with `npx` already included.

##  Preparation
1. Register for Goodreads API KEY.
2. Note your Goodreads user id. Open goodreads, click your profile picture on the upper-right, click profile. Look at the address bar. It looks like this:
    ```
    https://www.goodreads.com/user/show/12345678-jon-snow
    ```
    That `12345678` number in front of your name is your user id.
3. Clone this repo and enter inside the repo's directory.
    ```bash
    git clone 
    cd goodreads-widget
    ```
4. Create a bash script file, for example `env.sh`.
    ```sh
    vim env.sh
    ```
5. Fill the `env.sh` with the following lines:
    ```sh
    export GOODREADS_API_KEY={{YOUR_GOODREADS_API_KEY}}
    export GOODREADS_USER_ID={{YOUR_GOODREADS_USER_ID}}
    ```
    Replace the `{{YOUR_GOODREADS_API_KEY}}` with your own Goodreads API key, and `{{YOUR_)GOODREADS_USER_ID}}` with  your Goodreads user id.
6. Make `env.sh` executable and execute it.
    ```bash
    chmod +x env.sh
    source env.sh
    ```
7. Init NPM.
    ```bash
    npm install
    ```

## Usage
1.  Execute with:
    ```bash
    npx webpack
    ```
2.  The script will be available in `dist/main.js`. To include it into your HTML page, you must have an element with ID `bookshelf-widget`. For example:
    ```html
    <!doctype html>
    <html>
        <head>
        	<title>Getting Started</title>
      	</head>
      	<body>
    		<section id="bookshelf-widget">
    		    <script src="main.js"></script>  
    		</section>
    	</body>
    </html>
    ```
3.  Open your HTML page in the browser.

## Settings
1. Open `src/index.js`
2. 