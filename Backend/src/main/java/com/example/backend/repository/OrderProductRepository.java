package com.example.backend.repository;

import com.example.backend.model.OrderProduct;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderProductRepository extends CrudRepository<OrderProduct, Long> {

    //void deleteOrderProductsById(Long id);

    List<OrderProduct> findByOrderIdAndProductId(Long orderId, Long productId);
}
