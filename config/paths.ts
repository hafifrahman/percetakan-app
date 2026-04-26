export const paths = {
  dashboard: {
    getHref: () => '/dashboard',
  },
  auth: {
    register: {
      getHref: (redirectTo?: string | null | undefined) =>
        `/auth/register${redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ''}`,
    },
    login: {
      getHref: (redirectTo?: string | null | undefined) =>
        `/auth/login${redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ''}`,
    },
  },
  users: {
    getHref: () => '/users',
  },
  user: {
    getHref: (id: string) => `/users/${id}`,
  },
  orders: {
    getHref: () => '/orders',
    create: {
      getHref: () => '/orders/create',
    },
  },
  order: {
    getHref: (id: string) => `/orders/${id}`,
  },
}
