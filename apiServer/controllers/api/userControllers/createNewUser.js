import { createUserInstance } from './createUserInstance'

export const createNewUser = async (_, res) => {
  try {
    const userInstance = createUserInstance({
      username: 'test1'
    })

    return res.send(await userInstance.save())
  } catch (err) {
    return res.status(500).send(err.message)
  }
}
