npm run build
BUCKET_NAME=''
aws s3 cp dist s3://${BUCKET_NAME} --recursive
