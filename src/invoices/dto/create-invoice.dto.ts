import { ApiProperty } from "@nestjs/swagger";

export class CreateInvoiceDto {
    @ApiProperty({ example: 'John Doe' })
    customer_name: string;
    @ApiProperty({ example: 'John Doe' })
    customer_address: string;
    @ApiProperty({ example: '+62899999' })
    customer_num: string;
    @ApiProperty({ example: 100000 })
    amount: number;
    @ApiProperty({ example: 'progress' })
    status: string;
    @ApiProperty({ example: 'BCA' })
    payment_method: string;
    @ApiProperty({ example: '9252295hu2h9o5h39' })
    invoice_num: string;
    @ApiProperty({ example: new Date() })
    due_date: string;

}
