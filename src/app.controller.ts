import { Body, Controller, Get, Post, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { NoFilesInterceptor } from '@nestjs/platform-express';
import { PaymentDto } from './main-dto/payment.dto';
import * as Midtrans from 'midtrans-client'


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {
  }

  @Post("/payment")
  async payment(@Body() payment: PaymentDto) {
    let snap = new Midtrans.Snap({
      isProduction: false,
      serverKey: "SB-Mid-server-kSxjjwAnB8oKY8XCKQAaaRvG",
      clientKey: "SB-Mid-client-91BdxmsXBiAQaJVo",
    })
    const { id, prodName, quantity, price } = payment

    let parameter = {
      item_details: {
        name: prodName,
        price,
        quantity,
      },
      transaction_details: {
        order_id: id,
        gross_amount: price * quantity
      }
    }

    const token = await snap.createTransactionToken(parameter)

    return { token }
    // return this.appService.payment(request);
  }
}
