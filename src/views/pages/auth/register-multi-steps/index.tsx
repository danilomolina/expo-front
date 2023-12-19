// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Step from '@mui/material/Step'
import Stepper from '@mui/material/Stepper'
import StepLabel from '@mui/material/StepLabel'
import Typography from '@mui/material/Typography'

// ** Step Components
import StepPersonalInfo from 'src/views/pages/auth/register-multi-steps/StepPersonalInfo'
import StepAccountDetails from 'src/views/pages/auth/register-multi-steps/StepAccountDetails'
import StepBillingDetails from 'src/views/pages/auth/register-multi-steps/StepBillingDetails'

// ** Custom Component Import
import StepperCustomDot from 'src/views/forms/form-wizard/StepperCustomDot'

// ** Styled Components
import StepperWrapper from 'src/@core/styles/mui/stepper'
import { UserDataType } from 'src/context/types'

const steps = [
  {
    title: 'Conta',
    subtitle: 'Detalhes da Conta'
  },
  {
    title: 'Pessoal',
    subtitle: 'Entre com suas informações'
  },
  {
    title: 'Plano',
    subtitle: 'Escolha seu Plano'
  }
]

export interface User {
  email?: string,
  password?: string
}

const RegisterMultiSteps = () => {
  // ** States
  const [activeStep, setActiveStep] = useState<number>(0)
  const [user, setUser] = useState<User>({
    email: "",
    password: ""
  })
  const [people, setPeople] = useState<UserDataType>({
    name: "",
    birtyDate: "",
    cellPhone: "",
    userId: "",
    planId: "",
    affiliatePlatformId: "1234576",
    paidPlan: false,
    cpf: "",
    cep: "",
    neighborhood: "",
    street: "",
    number: "",
    complement: "",
    image: "src:teste",
    role: "client",
    city: "",
    state: "São Paulo"
  });

  // Handle Stepper
  const handleNext = () => {
    setActiveStep(activeStep + 1)
  }
  const handlePrev = () => {
    if (activeStep !== 0) {
      setActiveStep(activeStep - 1)
    }
  }

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return <StepAccountDetails handleNext={handleNext} user={user} setUser={setUser} />
      case 1:
        return <StepPersonalInfo handleNext={handleNext} handlePrev={handlePrev} people={people} setPeople={setPeople}/>
      case 2:
        return <StepBillingDetails handlePrev={handlePrev} user={user} people={people}/>

      default:
        return null
    }
  }

  const renderContent = () => {
    return getStepContent(activeStep)
  }

  return (
    <>
      <StepperWrapper sx={{ mb: 10 }}>
        <Stepper activeStep={activeStep}>
          {steps.map((step, index) => {
            return (
              <Step key={index}>
                <StepLabel StepIconComponent={StepperCustomDot}>
                  <div className='step-label'>
                    <Typography className='step-number'>{`0${index + 1}`}</Typography>
                    <div>
                      <Typography className='step-title'>{step.title}</Typography>
                      <Typography className='step-subtitle'>{step.subtitle}</Typography>
                    </div>
                  </div>
                </StepLabel>
              </Step>
            )
          })}
        </Stepper>
      </StepperWrapper>
      {renderContent()}
    </>
  )
}

export default RegisterMultiSteps
