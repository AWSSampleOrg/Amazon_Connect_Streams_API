#!/usr/bin/env bash

STACK_NAME="CustomeCCP"
S3_BUCKET=custome-ccp-$(whoami)-$(date +%Y-%m-%d)

aws cloudformation deploy \
    --template-file template.yml \
    --stack-name ${STACK_NAME} \
    --parameter-overrides \
    BucketName=${S3_BUCKET} \
    --capabilities CAPABILITY_NAMED_IAM
