import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { UserFactory } from '#database/factories/user_factory'
import db from '@adonisjs/lucid/services/db'

export default class extends BaseSeeder {
  async run() {
    // Création des utilisateurs
    const users = await UserFactory.createMany(30)

    // Génération des relations d'amitié
    const friendStatuses = ['pending', 'accepted', 'rejected']
    const insertedPairs = new Set()

    for (const user of users) {
      // Sélectionner aléatoirement 3 à 5 amis
      const friends = users
        .filter((u) => u.id !== user.id) // Éviter l'auto-relation
        .sort(() => 0.5 - Math.random()) // Mélanger
        .slice(0, Math.floor(Math.random() * 3) + 3) // Prendre 3 à 5 amis

      for (const friend of friends) {
        const pairKey = `${Math.min(user.id, friend.id)}-${Math.max(user.id, friend.id)}`

        if (insertedPairs.has(pairKey)) continue // Éviter les doublons
        insertedPairs.add(pairKey)

        const status = friendStatuses[Math.floor(Math.random() * friendStatuses.length)]
        const sender = Math.random() < 0.5 // Déterminer aléatoirement qui envoie la demande

        await db.table('user_friends').insert({
          user_id: sender ? user.id : friend.id,
          friend_id: sender ? friend.id : user.id,
          status,
          sender,
        })
      }
    }
  }
}
