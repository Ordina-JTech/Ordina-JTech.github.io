---
title:  "Fun With Git"
date:   2018-02-07 01:12:18
categories:
- Programming
tags:
- source
- scm
- git
- version management
- alias
- cli
author: ivonet
---


<img src="/assets/images/blog/2018/fun-with-git/fun-with-git.png" style="width:75%;height:75%;display: block;margin: 0 auto;"/>

The goal of this blog is to have some fun with git and learn something along the way...

<!-- more -->
Note:  
The commands provided should work in all MacOs and Linux based terminals. Some should also work on windows based machines, but
might need some adjustments. Don't ask me, I don't want to do it 😄.


# What is git?

> By far, the most widely used modern version control system in the world today is Git. Git is a mature, actively maintained open source project originally developed in 2005 by Linus Torvalds, the famous creator of the Linux operating system kernel
> Quote from [Atlassians site](https://www.atlassian.com/git/tutorials/what-is-git)

I think that most developers are active users of git nowadays or at least they should be 😂.


# Work before play

Before we can have some fun we need to understand the basics commands a bit. Feel free to skip this section if you already 
use git a lot. You will be familiar with all the commands I'll explain here. Just go to the fun part 🖖.

| Command | Description |
|:--------|:------------|
| `git init` | initializes a new git repository in the current folder |
| `git add <file or folder>` | Adds a change to the list of changes to be committed to the repository |
| `git commit -m "message"` | Commits the changes to the local repository | 
| `git pull` | Pulls the changes from the remote repository to the local repository |
| `git push` | Pushes the local changes to the remote repository|
| `git checkout -b <branch_name>` | Checkout a branch, witch to it and create it if necessary|

These are some of the most used commands. If you want to know more (and there is much more) I would recommend the following
sites:

* [try.github.io](https://try.github.io/levels/1/challenges/1)
* [Learn Git branching](https://learngitbranching.js.org/)

Now to have some fun with it.

# All play no work

Some commands are often done in combination like:

```bash
git init && touch README.md && git add README.md && git commit -m "Init repo" --allow-empty
```

To create an new repository from the current directory and add an empty README.md file to it and commit it so we start clean.

or 

```bash
git add --all && git commit -m "Development commit" && git push
```

To add all changes and new files to the commit list and commit them and push them to the remote repository.

This is no fun 😢 it's a pain in the ass to type these commands constantly so where is the fun in that...

Well here it goes...

# Git alias

Git has this fantastic thing called `alias` and you can do fun things with it. It is one of the lesser known features of git but 
worth learning.

```bash
git config --global alias.edit "config --global -e"
```

Will add a git alias to the global config of git making editing the global config easy. This is one of the commands I
always forget and now I just have to type `git edit` and I'll open the global config in my preferred editor.

If you have added this command and do the `git edit` global config is opened and you will see a new section in that file called `[alias]`.
You can of course add commands there to without using the `git config --global alias.[...]` part.

## More fun 

### git it

```bash
git config --global alias.it \
   "!git init && touch README.md &&  echo '.idea\n*.iml\nnode_modules\n.DS_Store\ntarget' > .gitignore &&  git add .gitignore  && git add README.md && git commit -m 'Initialized git repo' --allow-empty"
```

So the command `git it` will now perform this command, which creates a new git repo from the current folder and adds a `.gitignore` and a `README.md` file while doing it.
Note the `!` in the command. It will cause git to perform the whole command and not add the command to the git as parameters.

### git alias

list all git alias commands

```bash
git config --global alias.alias config --get-regexp ^alias\.
```

### git grog

A fantastic command if I do say so myself 😂. this command will show in a graph like show the commits even with the branches and stuff... in full technicolor yeah!!

```bash
git config --global alias.grog \
   'log --graph --abbrev-commit --decorate --all --format=format:"%C(bold blue)%h%C(reset) - %C(bold cyan)%aD%C(dim white) - %an%C(reset) %C(bold green)(%ar)%C(reset)%C(bold yellow)%d%C(reset)%n %C(white)%s%C(reset)"'
```

### git rmb <branch>

Delete a remote branch...

```bash
git config --global alias.rmb "push origin --delete"
```


### git files <commit>

This command will show all files changed in a commit. You can use `git grog` go get the commits and use this command to show the changed files.

```bash
git config --global alias.files diff-tree --no-commit-id --name-only -r
```

e.g. `git files 667f2d4`

# Fun git configs

* Allow all Git commands to use colored output, if possible

```bash
git config --global color.ui auto
```
* When branching off a remote branch, automatically let the local branch track the remote branch

```bash
git config --global branch.autosetupmerge true
```

# Fun git shell scripts

The scripts below provide useful and fun git extensions...

Just cut and paste them into a shell script on your path and make them executable `chmod +x <file>`

## git_dump_all_versions_of_a_file

Sometimes you just want all the versions ever made in your repository of a file...

```bash
#!/bin/sh
ROOT_FOLDER=$(\git rev-parse --show-toplevel)
CURR_DIR=$(pwd)
if [ "$ROOT_FOLDER" != "$CURR_DIR" ]
then
  echo "Switch to the root of the repo and try again. Should be in $ROOT_FOLDER"
  exit
fi

cd $ROOT_FOLDER
FILENAME=$*
EXTENSION="${FILENAME##*.}"

HASHES=$(\git log --oneline --decorate $FILENAME | coln.sh 1)
INDEX=1

for HASH in $HASHES
do
  INDEX_OUT=$(printf %03d $INDEX)
  OUT_FILENAME="$FILENAME.$INDEX_OUT.$HASH.$EXTENSION"
  echo "saving version $INDEX to file $OUT_FILENAME"
  git show $HASH:$FILENAME > $OUT_FILENAME
  let INDEX=INDEX+1
done
```

## git_track_all_remote_branches

Sometimes you do not only want to clone the repository but also track all its branches...

```bash
#!/bin/sh
git branch -r | grep -v grep | grep -v '\->' | while read remote; do git branch --track "${remote#origin/}" "$remote" ;done
```


## git_tag_all_repos

Sometimes you want to add a tag to all the repositories in a certain projects folder and push these tags to the remote...
This script assumes you have all projects for a client in a projects folder.

```bash
#!/bin/sh
if [ -z "$1" ]
then
   echo "Please provide a tag name..."
   exit 1
fi
find . -type d -depth 1 -exec echo "Gitting: {}" \; -exec git -C "{}" tag "$1" \; -exec git -C "{}" push --tags \;
```

## git_update_all

Every morning I want to update all my projets for a client before I start working...
This script assumes you have all projects for a client in a projects folder.

```bash
#!/bin/sh
find . -type d -depth 1 -exec echo "Git pulling: {}" \; -exec git -C "{}" pull \;
```

# Feedback

If you have more fun commands or ideas... [Feedback](http://ivo2u.nl/Yd) always welcome.        
