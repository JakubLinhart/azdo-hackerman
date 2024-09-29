- Cannot use Alpine linux, since MockTestRunner tries to download node version for the test runner to /root/azure-pipelines-task-lib/_download/node20/node-v20.13.1-linux-x64/. It is possible to start the downloaded node but only from its bin directory. If the current directory is different then a mocha test suite ends with /root/azure-pipelines-task-lib/_download/node20/node-v20.13.1-linux-x64/bin/node ENOENT.
- Node v20.13.1 is used so it maches the version downloaded by MockTestRunner.
- Set much higher test timeout (like 60 seconds). MockTestRunner tries to download node at the first run and it will never succeed if the timeout is too short.
- execution must be Node16 in task.json, since the agent doesn't contain Node20, and you will get this error:
  ```
    The current operating system is not capable of running this task. That typically means the task was written for Windows only. For example, written for Windows Desktop PowerShell.
  ```
  - to remove dev node_modules: npm prune --production
  - node_modules directory must be in task directory, so how to bundle multiple tasks without duplicating node_modules? https://github.com/microsoft/azure-pipelines-task-lib/issues/485
  - template that might solve the problem with node_modules: https://github.com/shudv/azure-pipelines-task-template