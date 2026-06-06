import { Product } from "src/products/product.entity";
import { Order } from "./order.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ForeignKey } from "typeorm";

@Entity("order_items")
export class OrderItem {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Product)
    product: Product;

    @Column()
    count: number;

    @ManyToOne(() => Order, (order) => order.orderItems, { onDelete: "CASCADE" })
    order: Order;
}