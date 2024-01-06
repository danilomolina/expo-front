// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): VerticalNavItemsType => {
  return [
    {
      title: 'Home',
      path: '/home',
      icon: 'mdi:home',
      subject: 'admin-page',
      action: 'read',
    },
    {
      title: 'Evento/Agenda',
      path: '/events',
      icon: 'mdi:calendar-range',
      subject: 'admin-page',
      action: 'read',
    },
    {
      title: 'Mentoria',
      path: '/mentoring',
      icon: 'mdi:hand-coin',
      subject: 'admin-page',
      action: 'read',
    },
    {
      title: 'Cupom',
      path: '/coupon',
      icon: 'mdi:ticket-percent',
      subject: 'admin-page',
      action: 'read',
    },
    {
      title: 'Curso',
      path: '/course',
      icon: 'mdi:account-school',
      subject: 'admin-page',
      action: 'read',
    },
    {
      title: 'Embaixada',
      path: '/embassie',
      icon: 'mdi:cellphone-marker',
      subject: 'admin-page',
      action: 'read',
    },
    {
      path: '/viewEvent',
      action: 'read',
      subject: 'acl-page',
      title: 'Agenda',
      icon: 'mdi:calendar-range',
    },
    {
      path: '/viewMentoring',
      action: 'read',
      subject: 'acl-page',
      title: 'Mentoria',
      icon: 'mdi:hand-coin',
    },
    {
      path: '/viewCoupon',
      action: 'read',
      subject: 'acl-page',
      title: 'Cupons',
      icon: 'mdi:ticket-percent',
    },
    {
      path: '/viewCourse',
      action: 'read',
      subject: 'acl-page',
      title: 'Cursos',
      icon: 'mdi:account-school',
    },
    {
      path: '/viewEmbassie',
      action: 'read',
      subject: 'acl-page',
      title: 'Embaixadas',
      icon: 'mdi:cellphone-marker',
    },
    {
      path: '/viewSupport',
      action: 'read',
      subject: 'acl-page',
      title: 'Suporte',
      icon: 'mdi:face-agent',
    },
    {
      path: '/viewAcount',
      action: 'read',
      subject: 'acl-page',
      title: 'Minha Conta',
      icon: 'mdi:account-circle',
    }
  ]
}

export default navigation
