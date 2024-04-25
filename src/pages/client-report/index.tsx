// ** React Imports
import { useEffect, useState } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import CardContent from '@mui/material/CardContent'

import "react-datepicker/dist/react-datepicker.css"
import { CardHeader } from '@mui/material'

import { UserDataType } from 'src/context/types'
import TableClientReport from './TableClientReport'
import { getPeople } from 'src/services/people'

import { Workbook } from 'exceljs'

const FormClientReport = () => {
  const [peoples, setPeoples] = useState<UserDataType[] | undefined>()

  const [company, setCompany] = useState<string>('')
  const [name, setName] = useState<string>('')
  const [idPlan, setIdPlan] = useState<string>('')

  useEffect(() => {
    handleGetPeoples()
  }, [])

  const handleExportExel = async () => {
    try {
      // Fazer a chamada para a API e obter os dados
      const response = await getPeople(0, 100, 0, undefined, name, company, idPlan)
      const data = response.data;

      // Criar um novo workbook
      const workbook = new Workbook()
      const worksheet = workbook.addWorksheet('Clientes');

      worksheet.columns = [
        {
          header: 'Nome',
          key: 'name',
          width: 10,
        },
        { header: 'Empresa', key: 'company', width: 32 },
        { header: 'Telefone', key: 'cellPhone', width: 32 },
        { header: 'Plano', key: 'planId', width: 32 },
      ];

      // Adicionar os dados à planilha
      worksheet.addRows(data);

      // Salvar o workbook como um arquivo Excel
      const buffer = await workbook.xlsx.writeBuffer();

      // Criar um blob com o buffer do arquivo
      const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

      // Criar um URL para o blob
      const url = URL.createObjectURL(blob);

      // Criar um link para o URL e configurar o download
      const a = document.createElement('a');
      a.href = url;
      a.download = 'clientes.xlsx'; // Nome do arquivo
      document.body.appendChild(a);

      // Clicar no link para iniciar o download
      a.click();

      // Limpar o URL do blob após o download
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Erro ao exportar para Excel:', error);
    }
  }

  const handleGetPeoples = async (name?: string, company?: string, idPlan?: string) => {
    const response = await getPeople(0, 100, 0, undefined, name, company, idPlan)
    setPeoples(response.data)
  }


  return (
    <Card>
      <CardHeader title='Relatório de Clientes' />
      <CardContent>

        <Grid container spacing={3}>
          <Grid item xs={4}>
            <TextField
              label='Nome'
              aria-describedby='validation-schema-first-name'
              onChange={(e) => setName(e.target.value)}
              fullWidth
            />
          </Grid>

          <Grid item xs={4}>
            <TextField
              label='Empresa'
              onChange={(e) => setCompany(e.target.value)}
              aria-describedby='validation-schema-last-name'
              fullWidth
            />
          </Grid>

          <Grid item xs={3}>
            <TextField
              label='Plano'
              onChange={(e) => setIdPlan(e.target.value)}
              aria-describedby='validation-schema-last-name'
              fullWidth
            />
          </Grid>

          <Grid item xs={2}>
            <Button size='large' type='button' onClick={() => handleGetPeoples(name, company, idPlan)} variant='contained' fullWidth>
              Pesquisar
            </Button>
          </Grid>
          <Grid item xs={3}>
            <Button size='large' type='button' onClick={handleExportExel} variant='contained' fullWidth color="success">
              Exportar para excel
            </Button>
          </Grid>
        </Grid>

      </CardContent>

      <Grid container spacing={5}>
        <Grid item xs={12}>
          <Card>
            <CardHeader title='Clientes Cadastrados' />
            <TableClientReport peoples={peoples} />
          </Card>
        </Grid>
      </Grid>


    </Card>
  )
}

FormClientReport.acl = {
  action: 'read',
  subject: 'admin-page'
}

export default FormClientReport
