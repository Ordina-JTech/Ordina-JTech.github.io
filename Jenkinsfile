import hudson.model.*
import hudson.util.*

pipeline {
    agent {
        label 'docker'
    }

    stages {
        stage('checkout') {
            steps {
                echo '=== checkout ==='
                checkout scm
            }
        }

        stage('Building site') {
            when {
                branch 'source'
            }

            steps {
                sh "docker run --rm -v \$(pwd):/srv/jekyll jekyll/jekyll:3.4.3 jekyll build"
            }
        }

        stage('Activating static site') {
            when {
                branch 'source'
            }
            steps {
                sh "git checkout master"
                sh "rm -f _site/docker-compose.yml _site/README.md"
                sh "cp -vaR _site/. . "
                sh "rm -rf _site"
                sh "git add ."
                sh "git commit -m \"Deploying static site at: \$(date +\"%Y-%m-%d %H:%M:%S\")\""
                sh "git push"
            }
        }
    }
}