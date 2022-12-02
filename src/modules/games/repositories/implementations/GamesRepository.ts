import { getRepository, Repository } from 'typeorm';

import { User } from '../../../users/entities/User';
import { Game } from '../../entities/Game';

import { IGamesRepository } from '../IGamesRepository';

export class GamesRepository implements IGamesRepository {
  private repository: Repository<Game>;
  private userRepository: Repository<User>

  constructor() {
    this.repository = getRepository(Game);
    this.userRepository = getRepository(User);
  }

  async findByTitleContaining(param: string): Promise<Game[]> {
    return await this.repository.createQueryBuilder()
      .where('games.title ILIKE :param', {param})
      .getMany()
  }

  async countAllGames(): Promise<[{ count: string }]> {
    return await this.repository.query('SELECT COUNT(id) from games'); // Complete usando raw query
  }

  async findUsersByGameId(id: string): Promise<User[]> {
    return await this.userRepository.createQueryBuilder()
      .select('users')
      .where('games.id = :id', { id })
      .getMany()
  }
}
