const core = require('@actions/core')

console.log('Hello World from main.js!')
console.log({ total: process.env.JOB_TOTAL, index: process.env.JOB_INDEX })

async function main() {
  if (process.env.JOB_INDEX === '0') {
    console.log('I am the first job!')
    core.setOutput('jobStatus', 'failed')
  } else {
    console.log('I am not the first job!')
    for (let k = 0; k < 10; k += 1) {
      console.log('checking output from first job...', k, '/', 10)
      const jobStatus = core.getInput('jobStatus')
      console.log({ jobStatus })
      await new Promise((resolve) => setTimeout(resolve, 10_000))
    }
  }
}

main()
