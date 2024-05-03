import { Injectable } from '@nestjs/common';
import { UniqueEntityID } from '@app/core/entities/UniqueEntityID';
import { PaginationParams } from '@app/core/repositories/PaginationParams';
import { FileRepository } from '@app/application/base/ports/FileRepository';
import { File } from '@app/domain/base/File';
import { FindResponse } from '@app/core/repositories/FindResponse';
import { jsonFormatPagination } from 'src/helpers/responseHelpers';

@Injectable()
export class InMemoryFileRepository implements FileRepository {
  public files: File[] = [];

  async findById(id: UniqueEntityID): Promise<File | null> {
    const file = this.files.find((file) => file.id.equals(id));
    if (!file) {
      return null;
    }
    return file;
  }

  async findByName(name: string): Promise<File | null> {
    const file = this.files.find((file) => file.name === name);
    if (!file) {
      return null;
    }
    return file;
  }

  async findMany({ page }: PaginationParams): Promise<FindResponse<File>> {
    const itemsPerPage = 20;
    const files = this.files.slice((page - 1) * 20, page * 20);
    return jsonFormatPagination<File[]>(
      files,
      page,
      this.files.length,
      itemsPerPage,
    );
  }

  async create(file: File): Promise<File> {
    this.files = [...this.files, file];
    return file;
  }

  async update(file: File): Promise<File> {
    const indexFile = this.files.findIndex((curFile) => curFile.id === file.id);
    if (indexFile != -1) {
      this.files[indexFile] = file;
    }
    return file;
  }

  async delete(file: File): Promise<File> {
    const indexFile = this.files.findIndex((curFile) => curFile.id === file.id);
    this.files.splice(indexFile, 1);
    return file;
  }
}
