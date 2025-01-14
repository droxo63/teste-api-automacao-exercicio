pipeline {
    agent any

    stages {
        stage('Colonando repositorio') {
            steps {
               git branch: 'main', url: 'https://github.com/droxo63/teste-api-automacao-exercicio.git'
            }
        }
        
        stage('Configuração-Instalação') {
            steps {
               bat 'npm install'
            }
        }   
        
        stage('Testes') {
            steps {
               bat '''set NO_COLOR=1
npm test'''
            }
        } 
    }
}