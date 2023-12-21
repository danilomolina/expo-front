// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): VerticalNavItemsType => {
  return [
    {
      title: 'Home',
      path: '/home',
      icon: 'mdi:home-outline',
    },
    {
      title: 'Evento/Agenda',
      path: '/events',
      icon: 'mdi:email-outline',
    },
    {
      title: 'Mentoria',
      path: '/mentoring',
      icon: 'mdi:email-outline',
    },
    {
      title: 'Cupom',
      path: '/coupon',
      icon: 'mdi:email-outline',
    },
    {
      title: 'Curso',
      path: '/course',
      icon: 'mdi:email-outline',
    },
    {
      title: 'Embaixada',
      path: '/embassie',
      icon: 'mdi:email-outline',
    },
    // {
    //   path: '/acl',
    //   action: 'read',
    //   subject: 'acl-page',
    //   title: 'Access Control',
    //   icon: 'mdi:shield-outline',
    // }
  ]
}

export default navigation
