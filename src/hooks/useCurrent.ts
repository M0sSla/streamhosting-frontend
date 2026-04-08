import { useEffect } from 'react'
import type { ApolloError } from '@apollo/client'

import {
	useClearSessionCookieMutation,
	useFindProfileQuery
} from '@/graphql/generated/output'

import { useAuth } from './useAuth'

function isUnauthorizedError(error: ApolloError) {
	const hasUnauthorizedGraphQLError = error.graphQLErrors.some(graphQLError => {
		const code = graphQLError.extensions?.code
		const originalError = graphQLError.extensions?.originalError as
			| { statusCode?: number }
			| undefined
		const message = graphQLError.message.toLowerCase()

		return (
			code === 'UNAUTHENTICATED' ||
			code === 'FORBIDDEN' ||
			originalError?.statusCode === 401 ||
			originalError?.statusCode === 403 ||
			message.includes('unauthorized') ||
			message.includes('not authorized')
		)
	})

	const networkStatusCode =
		'statusCode' in (error.networkError ?? {})
			? (error.networkError as { statusCode?: number }).statusCode
			: undefined

	return (
		hasUnauthorizedGraphQLError ||
		networkStatusCode === 401 ||
		networkStatusCode === 403
	)
}

export function useCurrent() {
	const { isAuthenticated, exit } = useAuth()

	const { data, loading, refetch, error } = useFindProfileQuery({
		skip: !isAuthenticated
	})
	const [clearSessionCookie] = useClearSessionCookieMutation()

	useEffect(() => {
		if (error && isAuthenticated) {
			if (isUnauthorizedError(error)) {
				void clearSessionCookie()
				exit()
				return
			}

			console.error('useCurrent findProfile error:', error)
		}
	}, [clearSessionCookie, error, exit, isAuthenticated])

	return {
		user: data?.findProfile,
		isLoadingProfile: loading,
		refetch
	}
}
