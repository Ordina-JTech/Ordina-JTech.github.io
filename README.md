# JTech Ordina
This repository contains the content hosted on https://ordina-jtech.github.io/


The JTech Blog page is powered by [Jekyll](https://jekyllrb.com). 
The blog posts are written in [Markdown](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet) and are converted to HTML by Jekyll.
Most code editors and IDEs have support for Markdown files.
Some of them, such as IntelliJ, offer a preview view to see the result as you type.

For running the blog locally you can either opt for using Docker or setting up Jekyll yourself.


## Running the blog with Docker

    - When running on Windows, make sure your drive is shared with Docker (Docker settings)
    - Execute `docker-compose up -d`
    - Browse to [http://localhost:4000/](http://localhost:4000/)
    - After making changes in the blog, the blog is automatically rebuilt
    
## Build locally with docker

From the source branch root folder run the following command...

```bash
docker run -v $(pwd):/srv/jekyll jekyll/jekyll:3.4.3 jekyll build
```

## Setting up Jekyll on your Mac or Linux

> **Prerequisites:**
> - Ruby (>= 2.4.0): this can be easily accomplished by using [rvm](https://rvm.io).
> - ImageMagick: this can be easily accomplished by using [Homebrew](https://brew.sh/).

Install RVM and Homebrew.

After installing RVM and Homebrew, check the latest version of Ruby:

    $ rvm list known
    
This command shows all the known versions of ruby
    
    # MRI Rubies
    [ruby-]1.8.6[-p420]
    [ruby-]1.8.7[-head] # security released on head
    [ruby-]1.9.1[-p431]
    [ruby-]1.9.2[-p330]
    [ruby-]1.9.3[-p551]
    [ruby-]2.0.0[-p648]
    [ruby-]2.1[.10]
    [ruby-]2.2[.9]
    [ruby-]2.3[.6]
    [ruby-]2.4[.3]
    [ruby-]2.5[.0]
    [ruby-]2.6[.0-preview1]
    ruby-head

You can use the latest develop version (in this case it is: 2.5.0) or any other version you like (>= 2.4.0).
    
Execute the following commands to install Ruby and ImageMagick and set up Jekyll:
Be sure to execute the last command in your cloned directory.

    $ rvm install 2.5.0 
    $ (sudo) gem install bundler
    $ bundle install
    $ brew install imagemagick

## Running Jekyll on your Mac or Linux
- Run `jekyll serve` in the root directory of the tech blog
    - If your post is to be published in the future, run `jekyll serve --future`
- Browse to [http://localhost:4000/](http://localhost:4000/)

## Add yourself as an author
If you are no [author](https://ordina-jtech.github.io/about/) yet follow the next steps:

1. Clone this repository
1. Add yourself as an author to `/_data/authors.yml` 
1. Put an image of yourself in `/img/author/`
    - use a square image (otherwise it will be cropped)
    - minimum width and height: 250px
1. Commit & Push!
1. Check if your face pops up as an [author](https://ordina-jtech.github.io/about/)

GitHub will automagically refresh the site content within a few minutes.
Maybe you need to clear your browser's cache.

## Create a new blog post
Blog posts are just markdown documents, so anyone can write them!

1. Clone this repository
1. Add a blog post image to the `/img/blogs/` directory
    - Make sure the image is a JPG/PNG file and has a resolution of 450x270 pixels or has at least the same ratio.
1. Create a new markdown file in folder `/_posts` with the format `yyyy-mm-dd-YOUR-TITLE.md`
1. Add following [**FrontMatter**](http://jekyllrb.com/docs/frontmatter/) tags on the top of your post (you can also copy-paste this from another post)
    - layout: post
    - authors: [] 
    - title: 
    - image: /img/blogs/...
    - tags: []
        - tags with only numbers must be in single quotes `'1234'`
    - category: 
    - comments: true
1. Write your blog post
    - Use any (online) **Markdown editor** (for example [brackets](http://brackets.io) or [stackedit.io](https://stackedit.io))
    - Be sure to publish as **plain text**! (Jekyll will generate the static HTML for us)
    - If you use images in your blog post, create a new directory in `/img/blogs/` and put your images in that subdirectory.
    - Tweak and commit your changes until you feel satisfied with it.
1. Commit & Push!
    - Don't forget to share your post with your colleagues and the social media (Twitter, LinkedIn, ...)!

GitHub will automagically refresh the site content within a few minutes.
Maybe you need to clear your browser's cache.

## You can make bigger changes than just add a blog
But don't apply changes without seeing they work for yourself.

## Style guide

Write a blog post as if you were writing code.
Adopt the [**one sentence per line** method](https://raw.githubusercontent.com/brandon-rhodes/blog/master/texts/brandon/2012/one-sentence-per-line.rst).

By starting a new line at the end of each sentence,
and splitting sentences themselves at natural breaks between clauses,
a text file becomes far easier to edit and version control.

This allows commenting on specific sentences in a pull request.
If a change is made to a sentence,
the diff will only show the difference between the old and new sentence,
and not the complete paragraph.

## SASS usage

When giving layout to components in your blog,
please take a look in the existing stylesheets if there isn't a class which you can reuse.
This way we keep our stylesheet files clean.

If you want to add styling,
please use the SASS files,
otherwise the SASS compilation process will overwrite your changes.

You can find SASS files in two locations:

- Partial files (beginning with `_`) need to go in the `_sass` directory
- Main files,
which need to be picked up by Jekyll and converted to CSS,
need to go in the `css` directory.
These files need to begin with two lines of `---` for Jekyll to pick them up for later compilation.

You can read more on Jekyll and SASS integration [here](https://jekyllrb.com/docs/assets/).

----

The commands above assume a non-windows development environment.