import styled from '@emotion/styled'
import { s3 } from 'src/configs/aws-exports'

export const uploadFile = async (file: any): Promise<string | undefined> => {
  const nameFile = file === undefined ? 'arquivo_inexistente' : file.name

  if (nameFile !== 'arquivo_inexistente') {
    const attachment = `https://expoecomm-img.s3.sa-east-1.amazonaws.com/${nameFile}`

    const params = {
      Bucket: 'expoecomm',
      Key: nameFile,
      Body: file,
    }

    try {
      const data = await s3.upload(params).promise()
      console.log(`File uploaded successfully.`, data)

      return attachment
    } catch (err: any) {
      if (err.code === 'NoSuchBucket') {
        console.log('O bucket não existe. Verifique o nome do bucket.')
      } else {
        console.error('Erro durante o upload do arquivo:', err)
      }
    }

    return undefined
  } else {
    return undefined
  }
}

export const previewImage = (event: React.ChangeEvent<HTMLInputElement>, preview: any) => {
  const input = event.target;

  if (input.files && input.files[0]) {
    const file = input.files[0];
    const reader = new FileReader();

    const selectedFile = input.files && input.files.length > 0 ? input.files[0] : undefined

    reader.onload = function (e) {
      if (e.target && e.target.result && preview) {
        console.log("e.target.result.toString() ==>", e.target.result.toString())
        preview.src = e.target.result.toString();
        preview.style.display = 'block';
      }
    };

    reader.readAsDataURL(file)

    const url = `https://expoecomm.s3.sa-east-1.amazonaws.com/${input.files[0].name}`;

    return { url, selectedFile }
  }
}

export const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});
