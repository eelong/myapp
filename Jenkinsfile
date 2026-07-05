pipeline {
    agent any
    // 声明Git参数下拉列表（插件识别）
    parameters {
        gitParameter(
            name: 'RELEASE_TAG',
            type: 'PT_TAG',
            filter: 'v*',
            defaultValue: '',
            description: '下拉选择要发布/回滚的版本Tag'
        )
    }
    environment {
        // WebHook自动推送Tag时自动抓取当前tag
        AUTO_TAG = sh script: 'git describe --tags --exact-match 2>/dev/null || echo ""', returnStdout: true
        // 优先级：下拉手动选择 > 自动识别tag
        USE_TAG = params.RELEASE_TAG.trim() ? params.RELEASE_TAG : AUTO_TAG.trim()
    }
    stages {
        stage('检出对应版本代码') {
            steps {
                echo "本次构建版本：${env.USE_TAG}"
                sh "git checkout ${env.USE_TAG}"
            }
        }
        stage('编译打包+发布') {
            when { expression { env.USE_TAG.startsWith('v') } }
            steps { sh "./deploy.sh ${env.USE_TAG}" }
        }
    }
}
