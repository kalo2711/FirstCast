import { environment } from '../environment'
import { responseDataHandler } from '../global-functions'
import { loadTranslations } from '../localization'
import { getAuthToken } from "./auth.utils"

export async function getNextTutorialForPage(page) {
  const url = environment['host'] + 'api/user/get/getNextUnseenTutorial?page=' + page
  if (page != null) {
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'x-app-auth': await getAuthToken(false),
          'Content-Type': 'application/json',
        },
      })     

      return await responseDataHandler(response,true)

    } catch (e) {
      console.log(e)
      setError(loadTranslations("generalUpdateTokenError") + e)
    }
  }
}

export async function updateTutorialAndGetNext(tutorial, page) {
  const url = environment['host'] + 'api/user/post/nextTutorial'
  if (tutorial != null) {
    try {
      const userToken = await getAuthToken(false)
      const body = {
        page: page,
        tutorial: tutorial
      }
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'x-app-auth': userToken,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      })     
      return await responseDataHandler(response, true)

    } catch (e) {
      console.log(e)
      setError(loadTranslations("generalUpdateTokenError") + e)
    }
  }
}
