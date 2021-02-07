const core = require('@actions/core');
const aws = require('aws-sdk')

async function run() {
  const region = core.getInput('aws-region', { required: true })
  const ecr = new aws.ECR({ region })

  const registryId = core.getInput('aws-account-id', { required: false })
  const repositoryName = core.getInput('repository', { required: true })
  const imageTag = core.getInput('tag', { required: true })
  const newTags = core.getInput('new-tags', { required: true }).replace(/\s+/g, '').split(',')

  const getImageParams = { registryId, repositoryName, imageIds: [{ imageTag }]}
  
  let putImageCallback = function(err, result) {
    if (err) {
      if (err.code == 'ImageAlreadyExistsException') {
        console.log('Image already exists, no action')
        return
      }
      core.setFailed(err.message)
    } else {
      let image = result.image
      core.info(`Image tagged: ${image.repositoryName}:${image.imageId.imageTag}`)
      core.debug(result)
    }
  }
  
  let getImageCallback = function(err, result) {
    if (err) {
      core.setFailed(err)
    } else {
      let image = result.images[0]
      core.info(`Image found: ${image.repositoryName}:${image.imageId.imageTag}`)
      core.debug(image)
      newTags.forEach(function(tag) {
        ecr.putImage(
          {
            registryId: image.registryId,
            repositoryName: image.repositoryName, /* required */
            imageManifest: image.imageManifest, /* required */
            imageTag: tag,
          },
          putImageCallback
        )
      })
    }
  }
  
  ecr.batchGetImage(getImageParams, getImageCallback);
}

module.exports = run;

/* istanbul ignore next */
if (require.main === module) {
  run();
}
