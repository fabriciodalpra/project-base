import { Injectable } from '@nestjs/common';
import { UniqueEntityID } from '@app/core/entities/UniqueEntityID';
import { LevelRepository } from '@app/application/base/ports/LevelRepository';
import { Level } from '@app/domain/base/Level';
import { PaginationParams } from '@app/core/repositories/PaginationParams';
import { FindResponse } from '@app/core/repositories/FindResponse';
import { jsonFormatPagination } from 'src/helpers/responseHelpers';

@Injectable()
export class InMemoryLevelRepository implements LevelRepository {
  public levels: Level[] = [];

  async findById(id: UniqueEntityID): Promise<Level | null> {
    const level = this.levels.find((level) => level.id.equals(id));
    if (!level) {
      return null;
    }
    return level;
  }

  async findByName(name: string): Promise<Level | null> {
    const level = this.levels.find((level) => level.name === name);
    if (!level) {
      return null;
    }
    return level;
  }

  async findMany({ page }: PaginationParams): Promise<FindResponse<Level>> {
    const itemsPerPage = 20;
    const levels = this.levels.slice(
      (page - 1) * itemsPerPage,
      page * itemsPerPage,
    );
    return jsonFormatPagination<Level[]>(
      levels,
      page,
      this.levels.length,
      itemsPerPage,
    );
  }

  async create(level: Level): Promise<Level> {
    this.levels = [...this.levels, level];
    return level;
  }

  async update(level: Level): Promise<Level> {
    const indexLevel = this.levels.findIndex(
      (curLevel) => curLevel.id === level.id,
    );
    if (indexLevel != -1) {
      this.levels[indexLevel] = level;
    }
    return level;
  }

  async delete(level: Level): Promise<Level> {
    const indexLevel = this.levels.findIndex(
      (curLevel) => curLevel.id === level.id,
    );
    this.levels.splice(indexLevel, 1);
    return level;
  }
}
