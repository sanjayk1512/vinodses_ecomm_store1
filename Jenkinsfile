pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "darin04/frontend-ecomm"
        IMAGE_TAG = "latest"
        DOCKER_CREDENTIALS_ID = "docker-hub-credentials"
        KUBE_CONFIG = "$HOME/.kube/config"
        DEPLOYMENT_FILE = "k8s-FE/Deployment.yml"
    }

    stages {
        
        stage('Git Clone') {
            steps {
                git branch: 'main', url: 'https://github.com/Darin40/vinodses_ecomm_store.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh "docker build -t $DOCKER_IMAGE:$IMAGE_TAG ."
            }
        }

        stage('Push Docker Image') {
            steps {
                withDockerRegistry([credentialsId: DOCKER_CREDENTIALS_ID, url: 'https://index.docker.io/v1/']) {
                    sh "docker push $DOCKER_IMAGE:$IMAGE_TAG"
                }
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                sh "kubectl apply -f $DEPLOYMENT_FILE"
            }
        }
    }
}
