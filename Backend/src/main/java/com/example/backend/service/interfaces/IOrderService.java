package com.example.backend.service.interfaces;

import com.example.backend.model.Order;
import com.example.backend.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public interface IOrderService {

    public List<Order> findAll();

    public Optional<Order> findById(Long id);

    public Order saveOrder(Order order);

    public List<Order> findOrderByUserId(Long userId);

    public void deleteById(Long id);
}

