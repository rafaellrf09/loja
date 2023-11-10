import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { StatusPedido } from "./enum/status-pedido.enum";
import { UsuarioEntity } from "../usuario/usuario.entity";
import { ItemPedidoEntity } from "./item-pedido.entity";

@Entity("pedidos")
export class PedidoEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: "valor_total", nullable: false })
    valorTotal: number;

    @Column({ name: "status", enum: StatusPedido, nullable: false })
    status: StatusPedido;

    @Column({ name: "comentario", length: 250, nullable: true })
    comentario: string;

    @ManyToOne(() => UsuarioEntity, (usuario) => usuario.pedidos)
    usuario: UsuarioEntity;

    @OneToMany(() => ItemPedidoEntity, (itemPedido) => itemPedido.pedido, {
        cascade: true,
    })
    itensPedido: ItemPedidoEntity[];

    @CreateDateColumn({ name: 'created_at' })
    createdAt: string;
    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: string;
    @DeleteDateColumn({ name: 'deleted_at' })
    deletedAt: string;
}
