package com.example.backend.controller;

import com.example.backend.exception.ExceptionHandling;
import com.example.backend.model.OrderProduct;
import com.example.backend.service.implementation.OrderProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/api")
public class OrderProductController extends ExceptionHandling {

    @Autowired
    private OrderProductService orderProductService;

    @GetMapping("/ordersProducts")
    public ResponseEntity<Iterable<OrderProduct>> findAllOrdersProducts() {
        return ResponseEntity.ok(orderProductService.findAll());
    }

    @PostMapping("/saveOrderProduct")
    public ResponseEntity<OrderProduct> saveOrderProduct(@RequestBody OrderProduct orderProduct) {
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .contentType(MediaType.APPLICATION_JSON)
                .body(orderProductService.save(orderProduct));
    }

    @DeleteMapping("/deleteOrderProducts/{id}")
    public ResponseEntity<Void> deleteOrderProductById(@PathVariable Long id) {
        orderProductService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/orderProduct/{orderId}_{productId}")
    public ResponseEntity<List<OrderProduct>> findOrderProduct(@PathVariable Long orderId, @PathVariable Long productId) {
        return ResponseEntity.ok(orderProductService.findOrderProduct(orderId, productId));
    }
}
