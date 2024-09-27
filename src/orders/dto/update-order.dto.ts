import { CreateOrderDto } from './create-order.dto';
import { PickType } from '@nestjs/swagger';

export class UpdateOrderDto extends PickType(CreateOrderDto, ['products']) {}
