## About

GitHub Action to add new tags to existing Docker Image. No pull/push here because of manifest schema v2 usage. Only works with AWS ECR registry.

**Table of Contents**

<!-- toc -->

- [Usage](#usage)
- [License Summary](#license-summary)
- [Security Disclosures](#security-disclosures)

<!-- tocstop -->

## Usage

```
name: ci

env:
  AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
  AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
  AWS_REGION: ${{ secrets.AWS_REGION }}

on:
  push:
    branches: master

jobs:
  release-stage-and-prod:
    runs-on: ubuntu-latest
    steps:
      - name: Retag test/image:dev as test/image:staging and test/image:production
        uses: abronin/ecr-retag-action@v1
        with:
          repository: test/image
          tag: dev
          new-tags: staging, production
```
## License Summary

This code is made available under the MIT license.

## Security Disclosures

If you would like to report a potential security issue in this project, please do not create a GitHub issue.  Instead, please [email me directly](mailto:abronin@gmail.com).
