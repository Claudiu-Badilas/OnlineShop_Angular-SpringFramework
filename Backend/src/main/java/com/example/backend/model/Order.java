package com.example.backend.model;

import com.example.backend.model.user.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity(name = "orders")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Date date;
    private Double totalPrice;
    private String status;

    //@JsonManagedReference
    @ManyToOne
    private User user;

    @ManyToMany(fetch = FetchType.EAGER , cascade = CascadeType.MERGE)
    //@JsonManagedReference
    @JoinTable(name = "orders_products",
            joinColumns = {@JoinColumn(name = "order_id")},
            inverseJoinColumns = {@JoinColumn(name = "product_id")})
    private List<Product> products = new ArrayList<>();
}
