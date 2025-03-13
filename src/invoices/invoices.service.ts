import { Inject, Injectable } from '@nestjs/common';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { DrizzleAsyncProvider } from 'src/drizzle/drizzle.provider';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '../drizzle/schema'
import { eq } from 'drizzle-orm';

@Injectable()
export class InvoicesService {
  constructor(
    @Inject(DrizzleAsyncProvider)
    private db: NodePgDatabase<typeof schema>,
  ) { }
  async create(createInvoiceDto: CreateInvoiceDto) {

    try {
      const invoice = await this.db.insert(schema.invoices).values(createInvoiceDto).returning()
      return { invoice: invoice[0], isSuccess: true };
    } catch (error) {
      return { error: error, isSuccess: false }
    }
  }

  findAll() {
    return this.db.query.invoices.findMany()
  }

  async findOne(id: string) {
    return await this.db.query.invoices.findFirst({ where: (invoice, { eq }) => (eq(invoice.id, id)) })
  }

  async update(id: string, updateInvoiceDto: UpdateInvoiceDto) {
    return await this.db.update(schema.invoices).set(updateInvoiceDto).where(eq(schema.invoices.id, id)).returning();
  }

  async remove(id: string) {
    return await this.db.delete(schema.invoices).where(eq(schema.invoices.id, id)).returning()
  }
}
