import AWS from 'aws-sdk'
import configValues from './configValues';

const { AWS: { ACCESS_KEY, SECRET_ACCESS } } = configValues;

AWS.config.update({
  accessKeyId: ACCESS_KEY.id,
  secretAccessKey: SECRET_ACCESS.key,
  region: 'sa-east-1'
});

export const s3 = new AWS.S3();
export const awsSes = new AWS.SES({ apiVersion: "2010-12-01" });
