pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "darin04/frontend-ecomm"
        IMAGE_TAG = "latest"
        DOCKER_CREDENTIALS_ID = "docker-hub-credentials" // Add your Docker Hub credentials in Jenkins
        KUBE_CONFIG = "$HOME/.kube/config"
        DEPLOYMENT_FILE = "k8s-FE/Deployment.yml"
    }

    stages {
        stage('Clone Repository') {
            steps {
                 git branch: 'main', url: 'https://github.com/Darin40/01_products_api.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build Frontend') {
            steps {
                sh 'npm run build --prod'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh "docker build -t $DOCKER_IMAGE:$IMAGE_TAG ."
            }
        }

        stage('Push Docker Image') {
            steps {
                withDockerRegistry([credentialsId: DOCKER_CREDENTIALS_ID, url: '']) {
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
