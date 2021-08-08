package com.example.backend.service.implementation;

import com.example.backend.model.OrderProduct;
import com.example.backend.repository.OrderProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class OrderProductService {
    @Autowired
    private OrderProductRepository orderProductRepository;

    public OrderProduct save(OrderProduct orderProduct) {
        return orderProductRepository.save(orderProduct);
    }

    public Iterable<OrderProduct> findAll() {
        return orderProductRepository.findAll();
    }

    public void delete(Long id) {
        if (orderProductRepository.findById(id).isPresent()) {
            orderProductRepository.deleteById(id);
        }
    }

    public List<OrderProduct> findOrderProduct(Long orderId, Long productId) {
        return orderProductRepository.findByOrderIdAndProductId(orderId, productId);
    }
}
