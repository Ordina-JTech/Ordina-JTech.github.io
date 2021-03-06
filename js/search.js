---
some_variable: "jeckyll wont update js without frontmatter.."
---

(function () {
    function displaySearchResults(results, store) {
        var postResults = document.getElementById('post-results');
        var trainingResults = document.getElementById('training-results');
        var talkResults = document.getElementById('talk-results');

        var appendPost = '<section id="one" class="wrapper spotlight alt style1"><div class="inner"><div class="content" style="text-align: left"><h2 class="major">Blog posts</h2><section class="features">';
        var appendTraining = '<section id="two" class="wrapper spotlight style2"><div class="inner"><div class="content" style="text-align: left"><h2 class="major">Taining Sessies</h2><section class="features">';
        var appendTalk = '<section id="three" class="wrapper spotlight alt style3"><div class="inner"><div class="content" style="text-align: left"><h2 class="major">Talks</h2><section class="features">';
        var endSection = '</section></div></div></section>';

        for (var i = 0; i < results.length; i++) {  // Iterate over the results
            var item = store[results[i].ref];
            if (item.type === 'post') {
                appendPost += '<article onclick="openPage(event, \'' + item.url + '\')">';
                appendPost += '<div class="article-container">';
                appendPost += '<div class="image-container">';
                appendPost += '<img src="' + item.image + '" alt="" class="article-image">';
                appendPost += '</div><div class="article-info">';
                appendPost += '<h3 class="major">' + item.title + '</h3>';
                appendPost += '<p class="clamp">' + item.intro + '</p>';
                appendPost += '</div></div>';
                appendPost += '<div class="read-more-container">';
                appendPost += '<p class="date">' + item.date + '</p>';
                appendPost += '<a href="' + item.url + '" class="special">Lees blog</a>';
                appendPost += '</div>';
                appendPost += '</article>';
            } else if (item.type === 'training') {
                appendTraining += '<article onclick="openPage(event, \'' + item.url + '\')" class="session">';
                appendTraining += '<div class="article-container">';
                appendTraining += '<div class="image-container">';
                appendTraining += '<img src="' + item.image + '" alt="" class="article-image">';
                appendTraining += '</div><div class="article-info">';
                appendTraining += '<h3 class="major">' + item.title + '</h3>';
                appendTraining += '<p class="clamp">' + item.subtitle + '</p>';
                appendTraining += '<p><span>Trainer:</span>' + item.trainer + '</p>';
                appendTraining += '<p><span>Duur:</span>' + item.duration + '</p>';
                appendTraining += '<p><span>Niveau:</span>' + item.level + '</p>';
                appendTraining += '</div></div>';
                appendTraining += '<div class="read-more-container">';
                appendTraining += '<a href="' + item.url + '" class="special">Meer info</a>';
                appendTraining += '</div>';
                appendTraining += '</article>';
            } else if (item.type === 'talk') {
                appendTalk += '<article onclick="openPage(event, \'' + item.url + '\')" class="talk">';
                appendTalk += '<div class="article-container">';
                appendTalk += '<div class="image-container">';
                appendTalk += '<img src="' + item.image + '" alt="" class="article-image">';
                appendTalk += '</div><div class="article-info">';
                appendTalk += '<h3 class="major">' + item.title + '</h3>';
                appendTalk += '<p class="clamp">' + item.subtitle + '</p>';
                appendTalk += '<p><span>Spreker:</span>' + item.speaker + '</p>';
                appendTalk += '<p><span>Duur:</span>' + item.duration + '</p>';
                appendTalk += '<p><span>Niveau:</span>' + item.level + '</p>';
                appendTalk += '</div></div>';
                appendTalk += '<div class="read-more-container">';
                appendTalk += '<a href="' + item.url + '" class="special">Meer info</a>';
                appendTalk += '</div>';
                appendTalk += '</article>';
            }
        }

        // Check if category contains items
        if(appendPost.indexOf('article') === -1) {
            appendPost += '<p>Geen posts gevonden</p>';
        }
        if(appendTraining.indexOf('article') === -1) {
            appendTraining += '<p>Geen trainingen gevonden</p>';
        }
        if(appendTalk.indexOf('article') === -1) {
            appendTalk += '<p>Geen talks gevonden</p>';
        }

        appendPost += endSection;
        appendTraining += endSection;
        appendTalk += endSection;

        postResults.innerHTML = appendPost;
        trainingResults.innerHTML = appendTraining;
        talkResults.innerHTML = appendTalk;
    }

    function getQueryVariable(variable) {
        var query = window.location.search.substring(1);
        var vars = query.split('&');

        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split('=');

            if (pair[0] === variable) {
                return decodeURIComponent(pair[1].replace(/\+/g, '%20'));
            }
        }
    }

    var searchTerm = getQueryVariable('query');

    if (searchTerm) {
        document.getElementById('search-box-header').setAttribute("value", searchTerm);
        document.getElementById('search-box').setAttribute("value", searchTerm);

        // Initalize lunr with the fields it will be searching on. I've given title
        // a boost of 10 to indicate matches on this field are more important.
        var idx = lunr(function () {
            this.field('id');
            this.field('title', {boost: 100});
            this.field('category');
            this.field('content');
        });

        for (var key in window.store) { // Add the data to lunr
            idx.add({
                'id': key,
                'title': window.store[key].title,
                'category': window.store[key].category,
                'content': window.store[key].content
            });

            var results = idx.search(searchTerm); // Get lunr to perform a search
            displaySearchResults(results, window.store); // We'll write this in the next section
        }
    }
})();