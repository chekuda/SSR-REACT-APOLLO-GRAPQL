import { graphql } from 'graphql'
import { RootQuery } from '../../schema'
import { Bet, User } from '../../../database/models'

describe('bet type', async () => {
  it('should be null when it doesnt exits', async () => {
    const query = `
      {
        bet(id: "5c46d806e7179a544940a78a") {
          title
        }
      }
    `
    const result = await graphql(RootQuery, query, {}, {})
    const { data } = result

    expect(data.bet).toBe(null)
  })
  it('should return the bet if it exists', async () => {
    const user = new User({
      username: 'mockUsername'
    })
    await user.save()
    const bet = new Bet({
      title: 'mockTitle',
      users: [user.id]
    })
    await bet.save()
    const query = `
      {
        bet(id: "${bet.id}") {
          title,
          users {
            _id
          }
        }
      }`

    const result = await graphql(RootQuery, query, {}, {})
    const { data } = result

    expect(data.bet.title).toBe('mockTitle')
  })
})
