pipeline {
    agent any   
    tools {
        nodejs "node16.14.2"
    }

    environment {
      GITHUB_ID = credentials('yarielre_github_Id')
    }
    parameters {
        string(name: "env", defaultValue: "staging")
        string(name: "port", defaultValue: "5055")
        string(name: "url", defaultValue: "https://stage.assembleagenitorivezia.ch")
        string(name: "branch", defaultValue: "main")
    }

    stages {                        
        stage("node-version") {
            steps {
                dir(".") {
                    sh "node -v"
                }
            }
        }

        stage("clean-ws") {
            steps {
                cleanWs deleteDirs: true
            }        
        }
        
        stage("build-backspace-project") {
            steps { 
                sh 'ls -a'
                sh 'cd backspace'
                sh 'npm install'
                sh 'npm run build'
            }        
        }

        stage("build-project") {
            steps {
                sh 'ls -a'
                sh 'npm install' 
                sh 'npm run build'
            
            }        
        }
    }
}