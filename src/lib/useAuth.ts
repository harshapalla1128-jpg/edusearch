import { useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'

export function useAuth() {
  const queryClient = useQueryClient()

  const { data: user, isLoading } = useQuery({
    queryKey: ['me'],
    queryFn: () => axios.get('/api/auth/me').then(r => r.data),
    retry: false,
  })

  const logout = async () => {
    await axios.post('/api/auth/logout')
    queryClient.setQueryData(['me'], null)
    queryClient.invalidateQueries({ queryKey: ['me'] })
    window.location.href = '/'
  }

  return { user, isLoading, logout }
}