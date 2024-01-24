import AWS from 'aws-sdk';

AWS.config.update({
 accessKeyId: 'AKIA4V3JQ23TTVUCYWLN',
 secretAccessKey: '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',
 region: 'sa-east-1'
});

export const s3 = new AWS.S3();

