pipeline {
    agent any

    stages {
        stage('Git clone') {
            steps {
               git branch: 'main', url: 'https://github.com/suffixscope/vinodses_ecomm_store.git'
            }
        }
        
        stage('Docker Image'){
            steps{
                sh 'docker build -t vinodses/ecomm_store .'
            }
        }
        
       stage('Docker Image push'){
            steps{
            withCredentials([string(credentialsId: 'docker_pwd', variable: 'docker_pwd')]) {
                   sh 'docker login -u vinodses -p ${docker_pwd}'
                   sh 'docker push vinodses/ecomm_store'
            }
            }
        }
        
         stage('k8s deployment'){
            steps{
             sh 'kubectl apply -f Deployment.yml'
            }
        }  
        
        
    }
}
