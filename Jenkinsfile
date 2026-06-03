pipeline {
    agent any

    environment {
        COMPOSE_PROJECT_NAME = 'alumni_uteq'
        DOCKER_API_VERSION = '1.41'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        stage('Build Docker Image') {
            steps {
                sh 'docker compose build'
            }
        }
        stage('Deploy') {
            steps {
                sh 'docker compose up -d'
            }
        }
        stage('Verificar Estado') {
            steps {
                sh '''
                    echo "====== CONTENEDOR CORRIENDO? ======"
                    docker ps -a --filter name=alumni_uteq_web
                    echo ""
                    echo "====== LOGS DEL CONTENEDOR ======"
                    docker logs alumni_uteq_web
                    echo ""
                    echo "====== CERTIFICADOS EN VOLUMEN? ======"
                    docker run --rm -v nginxfiles:/ssl alpine:latest ls -la /ssl/ 2>/dev/null || echo "Volumen nginxfiles vacio o no existe"
                    echo ""
                    echo "====== PROCESOS EN CONTENEDOR ======"
                    docker top alumni_uteq_web 2>/dev/null || echo "Contenedor no esta corriendo"
                    echo ""
                    echo "====== PUERTO 9613 EN HOST ======"
                    ss -tlnp 2>/dev/null | grep 9613 || netstat -tlnp 2>/dev/null | grep 9613 || echo "Puerto 9613 no aparece abierto"
                '''
            }
        }
    }
}
