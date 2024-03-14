const { DefaultArtifactClient } = require('@actions/artifact')
const fs = require('fs')

const artifactClient = new DefaultArtifactClient()

console.log('Hello World from main.js!')
console.log({ total: process.env.JOB_TOTAL, index: process.env.JOB_INDEX })

async function main() {
  if (process.env.JOB_INDEX === '0') {
    console.log('I am the first job!')
    fs.writeFileSync('status.json', JSON.stringify({ status: 'done' }))
    console.log('status.json written!')
    const { id, size } = await artifactClient.uploadArtifact('status', [
      'status.json',
    ])
    console.log('status.json uploaded!', { id, size })
  } else {
    // how to read the status from other jobs?
    console.log('I am not the first job!')
    for (let k = 0; k < 10; k += 1) {
      console.log('checking output from first job...', k, '/', 10)
      const artifact = await artifactClient.getArtifact('status')
      console.log({ artifact })
      await new Promise((resolve) => setTimeout(resolve, 10_000))
    }
  }
}

main()
