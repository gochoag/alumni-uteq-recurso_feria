pipeline {
    agent any

    environment {
        COMPOSE_PROJECT_NAME = 'alumni_uteq'
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
                    docker ps --filter name=alumni_uteq_web
                    echo ""
                    echo "====== LOGS DEL CONTENEDOR ======"
                    docker logs alumni_uteq_web
                    echo ""
                    echo "====== ERROR LOG DE NGINX ======"
                    docker exec alumni_uteq_web cat /etc/nginx/logs/error.log 2>/dev/null || echo "Error log vacio"
                    echo ""
                    echo "====== CERTIFICADOS EN /ssl/? ======"
                    docker exec alumni_uteq_web ls -la /ssl/ 2>/dev/null || echo "Directorio /ssl/ no existe"
                    echo ""
                    echo "====== TEST DESDE EL HOST A 9613 ======"
                    curl -sk --max-time 5 https://localhost:9613/ || echo "curl fallo - posiblemente nginx no esta escuchando"
                    echo ""
                    echo "====== PUERTO 9613 EN HOST ======"
                    ss -tlnp | grep 9613 || echo "Puerto 9613 no aparece como abierto"
                '''
            }
        }
    }
}
