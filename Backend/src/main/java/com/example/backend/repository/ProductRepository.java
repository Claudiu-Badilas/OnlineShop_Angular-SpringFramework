package com.example.backend.repository;

import com.example.backend.model.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    //Page<Product> findByCategoryId(Long id, Pageable pageable);

//   List<Product> findByCategory(CategoryType categoryType);

   //List<Product> findProductByOrderId(Long id);

   List<Product> findByCategoryId(Long id);

}
