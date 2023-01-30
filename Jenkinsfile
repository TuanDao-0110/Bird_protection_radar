pipeline {
   agent any
   
   stages {
      stage("build") {
        steps {
            bat "npm install",
            bat "npm run build"
        }
      }
      stage("deploy") {
        steps {
            bat "npm run dev"
        }
      }

   }
}