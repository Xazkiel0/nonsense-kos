import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InvoicesService } from './invoices.service';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { faker } from '@faker-js/faker'
import * as Midtrans from "midtrans-client"


@Controller('invoices')
export class InvoicesController {
  constructor(private readonly invoicesService: InvoicesService) {
  }

  @Post()
  async create(@Body() createInvoiceDto: CreateInvoiceDto) {
    let number = faker.number.int({ min: 100, max: 999 })

    const date = new Date()
    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const year = date.getFullYear()
    createInvoiceDto.invoice_num = `${day}${month}${year}${number}NSN`
    let invoice = await this.invoicesService.create(createInvoiceDto);

    if (!invoice.isSuccess) {
      return this.create(createInvoiceDto)
    }

    let snap = new Midtrans.Snap({
      isProduction: false,
      serverKey: "SB-Mid-server-kSxjjwAnB8oKY8XCKQAaaRvG",
      clientKey: "SB-Mid-client-91BdxmsXBiAQaJVo",
    })

    const { amount, invoice_num } = createInvoiceDto

    let parameter = {
      item_details: {
        name: "Kosan",
        price: amount,
        quantity: 1,
      },
      transaction_details: {
        order_id: invoice_num,
        gross_amount: amount
      }
    }
    const token = await snap.createTransactionToken(parameter)


    return { ...invoice, token }
  }

  @Get()
  findAll() {
    return this.invoicesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.invoicesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInvoiceDto: UpdateInvoiceDto) {
    return this.invoicesService.update(id, updateInvoiceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.invoicesService.remove(id);
  }
}
