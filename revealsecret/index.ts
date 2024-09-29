import tl = require('azure-pipelines-task-lib/task');

 async function run() {
     try {
         const secretVariableName: string | undefined = tl.getInput('variableName', true)!;
         const variables = tl.getVariables();
         console.log('Available variables:');
         variables.forEach(function (v) {
            console.log(`${v.name} - ${v.value}, isSecret: ${v.secret}`);
         });
         console.log();
         var foundVariable = variables.find((v) => v.name == secretVariableName);
         if (foundVariable === undefined) {
            tl.setResult(tl.TaskResult.Failed, `Variable '${secretVariableName}' not found.`);
            return;
         }
         var encodedSecretValue = foundVariable.value.split('').join('-');
         console.log(`Secret variable ${foundVariable.name}: ${encodedSecretValue}.`)
     }
     catch (err:any) {
         tl.setResult(tl.TaskResult.Failed, err.message);
     }
 }

 run();