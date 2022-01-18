package com.example.backend.service.implementation;

import com.example.backend.model.Order;
import com.example.backend.repository.OrderRepository;
import com.example.backend.service.interfaces.IOrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class OrderService implements IOrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Override
    public List<Order> findAll() {
        return orderRepository.findAll();
    }

    @Override
    public Optional<Order> findById(Long id) {
        return orderRepository.findById(id);
    }

    @Override
    public Order saveOrder(Order order) {
        return orderRepository.save(order);
    }

    @Override
    public List<Order> findOrderByUserId(Long userId) {
        return orderRepository.findOrderByUserId(userId);
    }

    @Override
    public void deleteById(Long id) {
        if (orderRepository.findById(id).isPresent()) {
            orderRepository.deleteById(id);
        }
    }
}

