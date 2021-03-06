package com.example.backend.service.implementation;

import com.example.backend.model.Product;
import com.example.backend.repository.ProductRepository;
import com.example.backend.service.interfaces.IProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class ProductService implements IProductService {
    @Autowired
    private ProductRepository productRepository;

    @Override
    public List<Product> getProducts() {
        return productRepository.findAll();
    }

    @Override
    public List<Product> getProductsById(Long id) {
        return productRepository.findByCategoryId(id);
    }

    @Override
    public Optional<Product> findProductById(Long id) {
        return productRepository.findById(id);
    }

    @Override
    public Product saveProduct(Product product) {
        return productRepository.save(product);
    }

    @Override
    public String updateProduct(Product product) {
        Optional<Product> productFromDB = productRepository.findById(product.getId());
        if (productFromDB.isPresent()) {
            productRepository.save(product);
            return "Updated successfully";
        } else {
            return "Update failed";
        }
    }

    @Override
    public void deleteById(Long id) {
        if (productRepository.findById(id).isPresent()) {
            productRepository.deleteById(id);
        }
    }
}
