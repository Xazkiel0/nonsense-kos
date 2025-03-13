import { ApiProperty } from "@nestjs/swagger"

export class PaymentDto {
    @ApiProperty({ example: Math.random() })
    id: string
    @ApiProperty({ example: "coba" })
    prodName: string
    @ApiProperty({ example: 200 })
    price: number
    @ApiProperty({ example: 2 })
    quantity: number
}