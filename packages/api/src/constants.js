export const GATEWAY = new URL('https://ipfs.io')

export const cluster = {
  apiUrl: CLUSTER_API_URL,
  basicAuthToken: 
    typeof CLUSTER_BASIC_AUTH_TOKEN !== 'undefined'
      ? CLUSTER_BASIC_AUTH_TOKEN
      : '',
}
