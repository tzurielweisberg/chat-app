pipeline {
    agent {
        label 'master'
    }
    stages {
    stage('Scan') {
        steps {
          withCredentials([
            string(credentialsId: 'DEV_AQUA_KEY', variable: 'AQUA_KEY'),
            string(credentialsId: 'DEV_AQUA_SECRET', variable: 'AQUA_SECRET'),
            string(credentialsId: 'GITHUB_TOKEN', variable: 'GITHUB_TOKEN')]        
            ) {
                sh '''
                printenv
                export TRIVY_RUN_AS_PLUGIN=aqua
                export trivyVersion=0.32.0
                export AQUA_URL=https://api-dev.aquasec.com
                export CSPM_URL=https://stage.api.cloudsploit.com
                curl -sfL https://raw.githubusercontent.com/aquasecurity/trivy/main/contrib/install.sh | sh -s -- -b . v${trivyVersion}  
                ./trivy fs --security-checks config,vuln,secret .
  '''
 }
        }
    }
    }
}
