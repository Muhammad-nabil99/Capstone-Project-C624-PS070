import CONFIG from './config'

const API_ENDPOINT = {
  HOME: `${CONFIG.BASE_URL}/list`,
  IMG: `${CONFIG.BASE_IMG}`,
  DETAIL: (id) => `${CONFIG.BASE_URL}/detail/${id}`,
  REVIEW: (id) => `${CONFIG.BASE_URL}/review?${id}`
}

export default API_ENDPOINT
