## About

GitHub Action to add new tags to existing Docker Image. No pull/push here because of manifest schema v2 usage. Only works with AWS ECR registry.

**Table of Contents**

<!-- toc -->

- [Usage](#usage)
- [License Summary](#license-summary)
- [Security Disclosures](#security-disclosures)

<!-- tocstop -->

## Usage

### Provide AWS credential directly.

  ```sh
        - name: Retag test/image:dev as test/image:staging and test/image:production
          uses: abronin/ecr-retag-action@v1
          with:
            aws-account-id: "001234567899" # optional, specify if you need to push to not main account
            aws-region: us-west-2 # optional, specify if you don't provide AWS_REGION env variable
            repository: test/image
            tag: dev
            new-tags: staging, production
          env:
            AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
            AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
            AWS_REGION: us-west-2

  ```

### Using [aws-actions/configure-aws-credentials](https://github.com/aws-actions/configure-aws-credentials) action.

```sh
      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v1
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: us-east-2

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
