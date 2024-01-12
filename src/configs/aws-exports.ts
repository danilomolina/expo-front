import AWS from 'aws-sdk';

AWS.config.update({
 accessKeyId: 'AKIA4V3JQ23T6L6NGU5X',
 secretAccessKey: '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',
 region: 'sa-east-1'
});

export const s3 = new AWS.S3();

