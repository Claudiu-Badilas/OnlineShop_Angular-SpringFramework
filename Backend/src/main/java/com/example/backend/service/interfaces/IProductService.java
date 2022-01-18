package com.example.backend.service.interfaces;

import com.example.backend.model.Product;
import com.example.backend.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public interface IProductService {

    public List<Product> getProducts();

    public List<Product> getProductsById(Long id);

    public Optional<Product> findProductById(Long id);

    public Product saveProduct(Product product);

    public String updateProduct(Product product);

    public void deleteById(Long id);
}
