package com.example.backend.controller;

import com.example.backend.exception.ExceptionHandling;
import com.example.backend.model.Order;
import com.example.backend.service.implementation.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping(path={"/","/order"})
public class OrderController extends ExceptionHandling {

    @Autowired
    private OrderService orderService;

    @GetMapping("/orders")
    public ResponseEntity<List<Order>> findAllOrders() {
        return ResponseEntity.ok(orderService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Order> findOrderById(@PathVariable Long id) {
        return ResponseEntity.ok(orderService.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found!")));
    }

    @GetMapping("/user-orders/{id}")
    public ResponseEntity<List<Order>> findOrderByUserId(@PathVariable Long id) {
        return ResponseEntity.ok(orderService.findOrderByUserId(id));
    }

    @PostMapping("/save")
    public ResponseEntity<Order> saveOrder(@RequestBody Order order) {
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .contentType(MediaType.APPLICATION_JSON)
                .body(orderService.saveOrder(order));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteProductById(@PathVariable Long id) {
        orderService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}

