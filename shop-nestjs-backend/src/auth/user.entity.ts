import { Product } from "../products/product.entity";
import { Order } from "../orders/order.entity";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Exclude } from "class-transformer";

export type Role = "BUYER" | "SELLER" | "ADMIN" | "MODERATOR";

@Entity("users")
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    username: string;

    @Column({ unique: true })
    email: string;

    @Column()
    @Exclude()
    password: string;

    @Column({ type: "simple-array" })
    roles: Role[];

    @OneToMany(() => Product, product => product.seller)
    products: Product[];

    @OneToMany(() => Order, order => order.user)
    orders: Order[];
}